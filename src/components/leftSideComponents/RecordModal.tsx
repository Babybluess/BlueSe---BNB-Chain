import React from "react";
import { useEnsText } from "wagmi";
import { normalize } from "viem/ens";
import EmailIcon  from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';

export const RecordModal = ({name, ensName} : {name: string, ensName: string}) => {

    const { data } = useEnsText({
        name: normalize(name),
        key: ensName,
    });

    const hasEmail = ensName == "email" && data != undefined
    const hasPhone = ensName == "phone" && data != undefined
    const hasTele = ensName == "org.telegram" && data != undefined
    const hasGithub = ensName == "com.github" && data != undefined

    const notHas = !hasEmail && !hasPhone && !hasTele && !hasGithub

    console.log(data)
    
    return (
        <div className={` gap-1 ${notHas ? "hidden": 'flex'}`}>
            {
                hasEmail 
                ?
                <EmailIcon/>
                : hasPhone ?
                <SmartphoneIcon/>
                : hasTele ?
                <TelegramIcon/>
                : hasGithub ?
                <GitHubIcon/>
                : ''
            }
            <p>{data}</p>
        </div>
    )
}

