import { border, borderRadius } from '@mui/system';
import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import reactangle1865 from "../../assets/img/student-db/pdf.png"
import materialsymbolsvideocamerafront from "../../assets/img/student-db/materialsymbolsvideocamerafront.svg"
import axios from 'axios'
import upload from "../../assets/img/upload.png"
import { toast } from 'react-toastify'
import { BASE_URLAPI } from '../constant'
import download from "../../assets/img/downloading.png"
import bg from '../../assets/img/bg/videoplayer.svg'


const videoPlayerScreenStyle ={
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', 
    display: 'flex',
    flexDirection: 'row',
    padding: '150px'
}

const videoPlayerStyle = {
    width: '700px',
    height:'395px',
    marginRight:'50px',
    borderRadius: '30px 0 30px 0'
}

const joinMeetStyle = {
    width: '150px', 
    backgroundColor: '#E75480',

  }

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const location = useLocation();
  const props = location.state;
  const [setidd, setsetid] = useState('')
  const [EducatorId, setEducatorId] = useState('')
  const [CourseID, setCourseID] = useState('')

  const hiddenFileInput = React.createRef();

  const handleButtonClick = (educatorId,courseid) => {
    hiddenFileInput.current.click();
    setEducatorId(educatorId)
    setCourseID(courseid)
    var dataid = localStorage.getItem("useriddd")
    setsetid(dataid)
    }

  const fileUpload = (file, CourseID, EducatorId, setidd) => {
    let data = new FormData();
    data.append('courseId', CourseID);
    data.append('educatorId', EducatorId);
    data.append('learnerId', setidd);
    data.append('feedbackFile', file);

    axios.post("http://35.175.147.190:8989/learner/file/upload", data)
    .then((res) => {
        console.log(res, "\"fetch course session list Successfully\"")
        toast.success("File Upload Successfully")
        // if (res.data.message == "\"fetch course session list Successfully\"") {
        //   setcourselist(res.data.data.inActiveResponse)
        //   setInactiveResponse(res.data.data.activeResponse)
        // }
    })
    .catch((err) => {
        console.log(err.response.data)
    })

    }

    const handleFileChange = (event) => {
    const file = event.target.files[0];
    fileUpload(file, CourseID, EducatorId, setidd)
    // Do something with the selected file
    // console.log(file,educatorId,courseId,"checking");
    }

    const fileDownload = (title) => {
        console.log("*************", title)
        let data = JSON.stringify({
          "filePath": title
        });
    
        let config = {
          method: 'post',
          url: `${BASE_URLAPI}` + "course/session/download",
          headers: {
            'Content-Type': 'application/json'
          },
          responseType: 'blob',
          data: data
        };
    
        axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            try {
    
              const url = URL.createObjectURL(new Blob([response.data]));
    
              const link = document.createElement("a");
    
              link.href = url;
    
              link.download = title.split('/').pop();
    
              document.body.appendChild(link);
    
              link.click();
    
              URL.revokeObjectURL(url);
    
            } catch (e) {
    
              console.log(e);
    
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }

  return (
    <div style={videoPlayerScreenStyle}>
      <video ref={videoRef} controls style={videoPlayerStyle}>
        <source src={props.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={{ width: 300 }}>
        <h1>{props.title}</h1>
        <div class="course-content-desc">
            <ul class="content-list">
                    <li>{props.description}</li>
                    {/* <li>No of Students per session - 25 to 50</li>
                    <li>Qualification - A minimum general educational qualification, i.e.,must have passed the S.S.L.C.</li>
                          */}
            </ul>
        </div>
        <div className="session-time" style={{ display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', }}>
                <a style={joinMeetStyle} width={100} className="btn btn-default st-btn rounded"
                  onClick={() => window.open("https://meet.google.com/ved-iutd-rdz?authuser=0")}>Join <img src={materialsymbolsvideocamerafront} alt="Student Join" className="img-fluid" /></a>
        </div>
        <h4 style={{ textAlign:'center' }}>Feedback Form</h4>
        <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-around' }}>
            <div className="butoonsss">
                
            <Button style={{ background: `linear-gradient(to right,  #FFFF00, #006400`, 
                    color:'black',textTransform: 'none', }} className=' mt-2' onClick={()=>handleButtonClick(props.educatorId,props.id)}>
                <img src={upload} alt="Student Join" className="addimg" />
                Upload</Button>
                <input
                type="file"
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                />

            </div>
            
            <div className="butoonsss">

                <Button style={{ color:'black', background: `linear-gradient(to right,  #FFFF00, #006400`,
                textTransform: 'none',
                 }} className=' mt-2'
                onClick={() => {
                    fileDownload(props.pdfDocumentName)
                }}
                >
                <img src={download} alt="Student Join" className="addimg" />
                Download
                </Button>
        </div> 
        </div>
        </div>
      </div>
  );
};

export default VideoPlayer;
