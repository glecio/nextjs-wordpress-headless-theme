import {gql} from "@apollo/client"
import client from "client"
import { BlockRenderer } from "components/BlockRenderer/BlockRenderer";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
import { mapMainMenuItens } from "utils/mapMainMenuItens";

export default function Home(props) {
  console.log("props: ", props)
  return (
    <div>
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
      blocks
    }
  }
}