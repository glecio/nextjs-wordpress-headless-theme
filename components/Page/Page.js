import { BlockRenderer } from "components/BlockRenderer"
import { MainMenu } from "components/MainMenu"

export const Page =(props) => {
   return (
    <div>
        <MainMenu 
            items={props.mainMenuItens}
            callToActionDestination={props.callToActionDestination}
            callToActionLabel={props.callToActionLabel}
        />
        <BlockRenderer blocks={props.blocks}/>
    </div>
    )
}