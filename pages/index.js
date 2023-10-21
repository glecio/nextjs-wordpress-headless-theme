import {gql} from "@apollo/client"
import client from "client"
import { BlockRenderer } from "components/BlockRenderer/BlockRenderer";
import { MainMenu } from "components/MainMenu/MainMenu";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
import { mapMainMenuItens } from "utils/mapMainMenuItens";

export default function Home(props) {
  console.log("props1: ", props)
  return (
    <div>
      <MainMenu items={props.mainMenuItens} 
        callToActionLabel={props.callToActionLabel} 
        callToActionDestination={props.callToActionDestination} />
      <BlockRenderer blocks={props.blocks} />
    </div>
  )
}

export const getStaticProps = async() => {
  const {data} = await client.query ({
    query: gql`
    query GetHomePage {
      nodeByUri(uri: "/") {
        ... on Page {
          id
          title
          blocks
        }
      }
      acfOptionsMainMenu {
        pageSlug
        pageTitle
        mainMenu {
          callToActionButton {
            destination {
              ... on Page {
                uri
              }
            }
            label
          }

          menuItens {
            items {
              destination {
                ... on Page {
                  uri
                }
              }
              label
            }
            menuItem {
              destination {
                ... on Page {
                  uri
                }
              }
              label
            }
          }
        }
      }

    }`
  })

  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks)
  return {
    props: {
      mainMenuItens: mapMainMenuItens(data.acfOptionsMainMenu.mainMenu.menuItens),
      callToActionLabel: data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
      callToActionDestination: data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
      blocks
    }
  }
}