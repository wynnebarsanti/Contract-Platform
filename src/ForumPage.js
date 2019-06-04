import React from "react";
import ForumComment from "./ForumComment.js"
import ForumPost from "./ForumPost.js"
import {Button, Input} from 'antd';
import './ForumPage.css';

const { TextArea } = Input;
export default class ForumPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            details: "",
            posts: []
        }
    }

    createPost = event => {
        console.log("it worked");
        var newArray = this.state.posts.slice();
        newArray.push({
            post: <ForumPost 
                    title={this.state.title}
                    details={this.state.details} />,
            comments: <ForumComment />
        })
        this.setState({
            posts: newArray
            })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
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
                    <Input 
                    name="title"
                    placeholder="Title of Post"
                    value={this.state.title}
                    onChange={this.handleChange}
                    />
                </div>
                <div>
                    <TextArea
                    name="details"
                    placeholder="Post details..."
                    value={this.state.details}
                    onChange={this.handleChange}
                    rows={4}/>
                </div>
                <div>
                    <Button 
                    onClick = {this.createPost}>
                        Create Post
                    </Button>
                </div>
                <div className="postHistory">
                {(this.state.posts.length) && this.mapPosts()}
                </div>
            </div>
        )
    }
}

