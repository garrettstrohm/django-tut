import './styles/main.css'
import React, {useEffect, useState} from 'react'
import Note from './components/Note';

const serverURL = 'http://localhost:8000';

const App = () => {

const [modalVis, setModalVis] = useState(false);
const [title, setTitle] = useState('');
const[content, setContent] = useState('');
const[posts, setPosts] = useState([])

const getAllPosts = async () => {
  const res = await fetch(`${serverURL}/posts`);
  const data = await res.json();

  if (res.ok) {
    console.log(data);
    setPosts(data);
  } else {
    console.log('Request for all posts failed.')
  }
}

useEffect(() => { getAllPosts() }, [])


const createNote = async (e) => {
  e.preventDefault();

  const req = new Request(
    `${serverURL}/posts/`,
    {
      body: JSON.stringify({title, content}),
      headers:{
        'Content-Type': "application/json"
      },
      method: 'POST'
    }
  );

  const res = await fetch(req);

  const data = await res.json();

  if(res.ok){
    console.log(data);
  } else { 
    console.log('Request failed')
  }

  setTitle('');
  setContent('');

  setModalVis(false);

  getAllPosts();
}

const deleteNote = async (noteId) => {
  const res = await fetch(`${serverURL}/posts/${noteId}`, {
    method: 'DELETE'
  });

  if(res.ok){
    console.log(res.status)
  }

  getAllPosts()
}


const postsList = posts.map(post => <Note key={post.id} title={post.title} content={post.content} onClick={() => deleteNote(post.id)}/>)


  return (
    <div>
            <div className="header">
                <div className="logo">
                    <p className="title">Guest Book</p>
                </div>
                <div className="add-section">
                    <a className="add-btn" href='#'
                        onClick={()=>setModalVis(true)}
                    >Add Note</a>
                </div>
            </div>
            {posts.length > 0?
            (<div className="post-list">
                  {postsList}
             </div>)
             :(
                <div className="posts">
                    <p className="centerText">No Posts</p>
                </div>
             )
        
        } 
         
          
            <div className={modalVis ? 'modal':'modal-not-visible'}>
                <div className="form">
                    <div className="form-header">
                        <div>
                            <p className="form-header-text">Create a Note</p>
                        </div>
                        <div>
                            <a href="#" className='close-btn'
                                onClick={()=>setModalVis(modalVis => !modalVis)}
                            >X</a>
                        </div>
                    </div>
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" id="title"
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                            className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea name="content" id="" cols="30" 
                                value={content}
                                onChange={(e)=>setContent(e.target.value)}
                                rows="5" 
                                className='form-control'
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Save" className='btn' onClick={createNote}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default App;
