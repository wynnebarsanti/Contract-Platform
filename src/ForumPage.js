import React from "react";
import ForumComment from "./ForumComment.js"
import ForumPost from "./ForumPost.js"
import {Button, Input} from 'antd';

const { TextArea } = Input;
export default class ForumPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    }

    createPost = event => {
        console.log("it worked");
        var newArray = this.state.posts.slice();
        newArray.push({
            post: <ForumPost />,
            comments: <ForumComment />
        })
        this.setState({
            posts: newArray
            })
    }

    mapPosts = () => {
        let posts = this.state.posts;
        console.log(posts);
        return posts.map(
            (item) => {
                return( 
                    <div>
                        {item.post}
                        {item.comments}
                    </div>
                )
            }
        )
    }
    
    render(){
        return(
            <div className="container">
                <div>
                    <Input placeholder="Title of Post"/>
                </div>
                <div>
                    <TextArea
                    placeholder="Post details..."
                    rows={4}/>
                </div>
                <div>
                    <Button 
                    onClick = {this.createPost}>
                        Create Post
                    </Button>
                </div>
                {(this.state.posts.length) && this.mapPosts()}
            </div>
        )
    }
}

