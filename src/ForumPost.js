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
                <Card title={this.props.title} style={{ width: 550 }}>
                    <p>{this.props.details}</p>
                </Card>
            </div>
        )
    }

}