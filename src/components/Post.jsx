import React from "react";
import { BsFillSendFill, BsFillFileImageFill } from "react-icons/bs";

const Post = () => {
    return (
        <div className="post">
            <div className="post-top">
                <h3>New post</h3>
                <div className="post-input">
                    <input type="text" placeholder="What’s on your mind?" />
                    <label>
                        <BsFillFileImageFill className="file" />
                        <input type="file" hidden />
                    </label>

                    <button>
                        <BsFillSendFill />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Post;
