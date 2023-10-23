import client from "client"
import { gql } from "@apollo/client"

const handler = async (req, res  ) => {
    try {
        const filters = JSON.parse(req.body)
        const { data } = await client.query ({
            query: gql`
            query AllPropertiesQuery {
                properties(where: {offsetPagination: {size: 3, offset: ${((filters.page || 1) - 1) * 3 }}}) {
                    pageInfo {
                    offsetPagination {
                        total
                    }
                    }
                    nodes {
                    propertyFeatures {
                      bathrooms
                      bedrooms
                      fieldGroupName
                      hasParking
                      petFriendly
                      price
                    }
                    title
                    uri
                    databaseId
                    featuredImage {
                      node {
                        uri
                        sourceUrl
                      }
                    }
                  }
                }
              }
            
            `
        })
        return res.status(200).json({
            total: data.properties.pageInfo.offsetPagination.total,
            properties: data.properties.nodes
        })
    } catch(e) {
        console.log("error", e)
    }
}

export default handler;