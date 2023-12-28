import { ThemeTypeProps } from "../../global/ts/_interfaces"
import { iconsSVGByName, iconsColorByName } from "../../global/ts/icons"

function TypeIconImage({themeType} : ThemeTypeProps){
    return <img className="typeIconImage" src={iconsSVGByName[themeType]} alt="themeIcon" />
}

function TypeIconComFundo({themeType} : ThemeTypeProps){
    return(
        <div className="typeIconFundo" style={{backgroundColor: iconsColorByName[themeType]}}>
            <TypeIconImage themeType={themeType}/>
        </div>
    )
}

export const TypeIcon = {
    withoutBackground: TypeIconImage,
    withBackground: TypeIconComFundo
}