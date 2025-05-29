// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BlueSe {
    ERC20 _token;
    using Counters for Counters.Counter;

    Counters.Counter public  _likeAmount;
    Counters.Counter public  _commentAmount;
    Counters.Counter public  _idPost;
    Counters.Counter public  memberAmount;

    address public creator;

    constructor() {
        creator = msg.sender;
    }

   mapping(address => mapping(uint256 => bool)) public isLiked;
   mapping (uint256 => address[]) public  likeList; 
   mapping(uint256 => Comment[]) public commentList;
   mapping (address => mapping (address => Message[])) public  messageList;
   mapping (address => mapping (address => uint256)) public  newMessageNumber;
   mapping (address => address[]) public friendList;
   mapping (address => uint256) public warningAccount;
   mapping (address => bool) public bannedAccount;

    struct Post {
        uint256 id;
        string context;
        string caption;
        address owner;
        string typeContext;
        uint256 totalLike;
        uint256 totalComment;
    }

    struct Comment {
        uint256 idPost;
        address owner;
        string context;
        address replyPerson;
    }

    struct Message {
        string context;
        bool isRead;
    }

    struct FriendRequest {
        address sender;
        address receiver;
    }

    Post[] public posts;
    FriendRequest[] public friendRequests;
    address[] public memberAddress;

    uint256 private stakingFee = 1;

    modifier onlyCreator() {
        require(
            msg.sender == creator,
            "Only the creator can call this function."
        );
        _;
    }

     modifier checkAllowance() {
        require(_token.allowance(msg.sender, address(this)) >= stakingFee, "Banlance is not enough");
        _;
    }

    event CreatePost(uint256 indexed _id, string _context, string _caption, address _owner, string _type, uint256 _totalLike, uint256 _totalComment, address[] _liker, address[] _commentList);
    event CommentPost(uint256 _id, address _owner, string _context, address _replyPers);
    event LikePost(uint256 _id);
    event QuitLike(uint256 _id);
    event SendMessage(address _sender, address _receiver, string _context, bool _isRead);
    event ReplyMessage(address _sender, address _receiver, string _context, bool _isRead);
    event AddFriend(address _sender, address _receiver);
    event AceptRequest(address _sender);

    function createPost(string memory _context, string calldata _caption, string memory _type) public  {
        require(msg.sender != address(0), "Address is not valid");

        _idPost.increment();
        uint256 idCurrent = _idPost.current();

        posts.push(
            Post({
                id: idCurrent,
                context: _context,
                caption: _caption,
                owner: payable (msg.sender),
                typeContext: _type,
                totalLike: 0,
                totalComment: 0
            })
        );

        // _token.transferFrom(msg.sender, address(this), stakingFee);

        emit CreatePost( idCurrent, _context, _caption, payable (msg.sender), _type, 0, 0, new address[](0), new address[](0));
    }

    function commentPost(uint256 _id, string memory _context, address _replyPers) public {
         require(msg.sender != address(0), "Address is not valid");
         require(0 <= _id && _id < posts.length, "Post is not exist");

        _commentAmount.increment();
        uint256 commentAmount = _commentAmount.current();

        commentList[_id].push(
            Comment
            (
                _id,
                payable (msg.sender),
                _context,
                _replyPers
            )
        );

        posts[_id].totalComment = commentAmount;

        // _token.transferFrom(msg.sender, address(this), stakingFee);

         emit CommentPost(_id, payable (msg.sender), _context, _replyPers);
    }

    function likePost(uint256 _id) public {
        require(!isLiked[msg.sender][_id], "You have liked post");

        _likeAmount.increment();
        uint256 likeAmount = _likeAmount.current();
        
        isLiked[msg.sender][_id] = true;
        likeList[_id].push(msg.sender);

        posts[_id].totalLike = likeAmount;

        emit LikePost(_id);
    }

    function quitLike(uint256 _id) public {
        require(isLiked[msg.sender][_id], "You have quit liking post");

         _likeAmount.decrement();
        uint256 likeAmount = _likeAmount.current();
        
        isLiked[msg.sender][_id] = false;
        
        for (uint256 i = 0; i < likeList[_id].length; i++) {
            if (likeList[_id][i] == msg.sender) {
                delete likeList[_id][i];
            }     
        }

         posts[_id].totalLike = likeAmount;

        emit QuitLike(_id);
    }

    function sendMessage(address _to, string memory _context) public {
        require(msg.sender != address(0), "Address is not valid");
        require(checkFriend(_to), "It is not my friend");

        messageList[msg.sender][_to].push(
            Message(
                _context,
                false
            )
        );

        uint256 count = newMessageNumber[_to][msg.sender] + 1;

        newMessageNumber[_to][msg.sender] = count;

        emit SendMessage( payable (msg.sender), _to, _context, false);
    }

    function replyMessage(address _to, string memory _context) public {
        require(_to != address(0), "Address is not valid");
        require(checkFriend(_to), "It is not my friend");

        messageList[msg.sender][_to].push(
            Message(
                _context,
                true
            )
        );

        newMessageNumber[_to][msg.sender] = 0;

        emit ReplyMessage( payable (msg.sender), _to, _context, true);
    }

    function addFriend(address _friendAddress) public {
        require(_friendAddress != address(0), "Friend address is not valid");

        friendRequests.push(
            FriendRequest({
                sender: payable (msg.sender),
                receiver: _friendAddress
            })
        );

        emit AddFriend(payable (msg.sender), _friendAddress);
    }

    function checkRequest(address _sender) public view returns (uint256) {
        uint256 indexRequest = 1000;

        for (uint256 i = 0; i < friendRequests.length; i++) 
        {
            if (friendRequests[i].sender == _sender && friendRequests[i].receiver == msg.sender) {
                indexRequest = i;
                break ;
            }
        }

        return indexRequest;
    }

    function acceptRequest(address _sender) public {
        require( 0 <= checkRequest(_sender) && checkRequest(_sender) < friendRequests.length, "Don't have request");
        
        uint256 index = checkRequest(_sender);
        friendList[msg.sender].push(_sender);
        friendList[_sender].push(msg.sender);

        delete friendRequests[index];
        
        emit AceptRequest(_sender);
    }

    function memberCommunity (address _signer) public {
        require(_signer != address(0), "Signer address is not valid");

        for (uint8 i = 0; i < memberAddress.length; i++) 
        {
            if (memberAddress[i] == _signer) {
                break;
            }
        } 

        memberAddress.push(_signer);
        memberAmount.increment();
    }

    function checkFriend (address _friend) public view returns (bool) {

        bool check = false;

        for (uint8 i = 0; i < friendList[msg.sender].length; i++) 
        {
            if(_friend == friendList[msg.sender][i]) {
                check = true;
                break;
            }
        }

        return check;
    }

    function changeStakingFee(uint256 _fee) public {
        require(_fee > 0, "Fee is less than 0");
        
        stakingFee = _fee;
    }

    function reportPost (uint256 _id) public {
        require(0 <= _id && _id < posts.length, "ID post is not valid");

        uint256 reportNumber = warningAccount[posts[_id].owner] + 1;
        warningAccount[posts[_id].owner] = reportNumber;


    }

    function banAccount (address _account) public onlyCreator {
        require( warningAccount[_account] >= 3, "Account is warning");

        bannedAccount[_account] = true;

    }

    function deletePost (uint256 _id) public onlyCreator {
        require( 0 <= _id && _id < posts.length, "Post is not exist" );

        delete posts[_id];
    }

    function getAllMember() public view returns ( address[] memory) {
        return memberAddress;
    } 

    function getAllPost() public view returns (Post[] memory) {
        return posts;
    }

    function getAllRequest() public view returns (FriendRequest[] memory) {
        return friendRequests;
    }
}