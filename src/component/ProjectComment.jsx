import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProjectComment = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ user: '', content: '' });

    useEffect(() => {
        // console.log('Post ID:', postId);
        fetchComments();
    }, []);

    const fetchComments = async () => {
        const response = await axios(`/comments/${postId}`);
        console.log(response.data);
        setComments(response.data);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        // console.log('Submitting comment:', { postId, ...newComment });
        await axios.post('/comments', { postId, ...newComment });
        setNewComment({ user: '', content: '' });
        fetchComments();
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('이 댓글을 삭제하시겠습니까?')) {
            await axios.delete(`/comments/${commentId}`);
            fetchComments(); // 삭제 후 댓글 목록 새로고침
        }
    };

    return (
        <div className='comment'>
            <form onSubmit={handleCommentSubmit}>
                <input
                    className='cmt writer'
                    type="text"
                    placeholder="작성자"
                    value={newComment.user}
                    onChange={(e) => setNewComment({ ...newComment, user: e.target.value })}
                    required
                />
                <input
                    className='cmt contents'
                    type='text'
                    placeholder="댓글 내용"
                    value={newComment.content}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    required
                />
                <button className='com-submit'>등록</button>
            </form>
            <ul>
                {comments.map(comment => (
                    <div key={comment.id} className='commentId'>
                        <span className='content-box'>{comment.user}</span>
                        <br/>
                        <span>{comment.content}</span>
                        <button onClick={() => handleDeleteComment(comment.id)}>X</button>
                    </div>
                ))}
            </ul>
        </div>
    );
};
export default ProjectComment;