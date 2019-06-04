import React from "react";
import { Card } from 'antd';

export default class ForumPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            author: "Current User",
            timestamp: ""
        }
    }

    render(){
        return(
            <div>
                <Card title="Title of Post" style={{ width: 550 }}>
                    <p>{this.state.author}:Post Details</p>
                </Card>
            </div>
        )
    }

}