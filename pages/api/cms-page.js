import axios from 'axios'
import Constant from './helper/constant'

export default function CmsPage(req,res) {
    if(req.method === "POST"){
        if(req.body.id){
            const graphqlQuery = {
                operationName:'cmsPage',
                query: `query CmsPage($id: Int){
                    cmsPage (id : $id ){
                      content_heading
                      meta_title
                      meta_keywords
                      meta_description
                      page_layout
                      title
                      url_key
                       content
                    }
                }`,
                variables: {id: req.body.id}
            }

            axios.post(Constant.magentoGraphQLEndpoint, graphqlQuery,{"Content-Type": "application/json"})
            .then((response) => {
                res.status(200).json(response.data)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
            
        } else {
            res.status(401).json({ status: "Unauthorised access"})
        }
    } else {
        res.status(401).json({ status: "Unauthorized access"})
    }
}





















