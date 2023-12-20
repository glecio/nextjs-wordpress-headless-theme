import { CallToActionButton } from "components/CallToActionButton/CallToActionButton"
import { Columns } from "components/Columns"
import { Column } from "components/Column"
import { Cover } from "components/Cover"
import { Heading } from "components/Heading"
import Image from "next/image"
import { Paragraph } from "components/Paragraph/Paragraph"
import { theme } from "theme"
import { PropertySearch } from "components/PropertySearch/PropertySearch"

export const BlockRenderer = ({blocks}) => {
    return blocks.map(block => {
        console.log("block-renderer", block)
        switch(block.name){
            case "acf/ctabutton" :{
                return <CallToActionButton key={block.id} buttonLabel={block.attributes.data.label} destination={block.attributes.data.destination} align={block.attributes.data.align} />
            }

            case "core/paragraph" :{
                return <Paragraph key={block.id} 
                textAlign={block.attributes.align} 
                level={block.attributes.level}
                content={block.attributes.content}
                textColor={
                    theme[block.attributes.textColor] ||
                    block.attributes.style?.color?.text}
                />
            }
            case "core/post-title" :
            case "core/heading" :{
                return <Heading key={block.id} 
                textAlign={block.attributes.textAlign} 
                level={block.attributes.level}
                content={block.attributes.content}
                />
            }

            case "core/cover" : {
                return (
                    <Cover key={block.id} background={block.attributes.url}> 
                        <BlockRenderer blocks={block.innerBlocks} />
                    </Cover>
                )
            }

            case "core/columns" : {
                return (
                        <Columns key={block.id} isStackedOnMobile={block.attributes.isStackedOnMobile} >
                            <BlockRenderer blocks={block.innerBlocks} />
                        </Columns>
                    )
            }

            case "core/column" : {
                return (
                    <Column key={block.id} width={block.attributes.width} >
                            <BlockRenderer blocks={block.innerBlocks} />
                    </Column>
                 )
            }
            case "core/group" :{
                return <BlockRenderer key={block.id} blocks={block.innerBlocks}/>
            }
            case "core/block" :{
                return <BlockRenderer key={block.id} blocks={block.innerBlocks}/>
            }
            
            case "core/image" : {
                return (
                    <Image key={block.id} 
                    src={block.attributes.url}
                    width={block.attributes.width}
                    height={block.attributes.height}
                    alt={block.attributes.alt || ""}
                    />
                )
            }

            case "acf/propertysearch" : {
                return (
                    <PropertySearch key={block.id}  />
                )
            }
                
                
            default: {
                //console.log("unknown", block)
                return null
            }
        }
    })
}