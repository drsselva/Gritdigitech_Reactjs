import React, { useEffect } from 'react'
import "../../css/aos.css"
import "../../css/main.css"
import Footer from '../../component/Footer/Footer'
import Header from '../../component/Header/Header'
import Crumbs from '../../component/Crumbs/Crumbs'
import ellipse from "../../assets/img/student-db/ellipse.png"
import { useState, useRef } from 'react'
import Sessions from '../../microcomponents/sessions/Sessions'
import Popularcourses from '../../microcomponents/popularcourse/Popularcourses'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { logindetailSelector } from '../../Slices/login'
import Aos from 'aos'
import download from "../../assets/img/downloading.png"
import upload from "../../assets/img/upload.png"
import addimg from "../../assets/img/add.png"
import Button from '@mui/material/Button';
import materialsymbolsvideocamerafront from "../../assets/img/student-db/materialsymbolsvideocamerafront.svg"
import { sessionDetails } from '../../constants/constants'
import { useNavigate } from 'react-router-dom'
import './styles.css'
import reactangle1865 from "../../assets/img/student-db/pdf.png"
import { BASE_URLAPI } from '../constant'
import rectange1834 from "../../assets/img/student-db/rectangle1834.png"
import { Container, Col, Row, } from 'react-bootstrap';
import moment from 'moment'
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify'
import editdocumenticon from "../../assets/img/tutor-db/editdocumenticon-1.svg"
import Card from '../../../src/component/Card/card';


function Studentdashboard() {
  const Navigate = useNavigate()

  const { logindetails } = useSelector(logindetailSelector)
  // console.log(logindetails, "logindetailslogindetails")
  const [uploadData, setUploadData] = useState()

  const [getprofiles, setgetprofiles] = useState('')
  const [getnames, setgetnames] = useState('')
  const [getimage, setgetimage] = useState('')
  const [emailid, setemailid] = useState('')
  const [setidd, setsetid] = useState('')
  const [EducatorId, setEducatorId] = useState('')
  const [CourseID, setCourseID] = useState('')

  const [courselist, setcourselist] = useState([])
  const [InactiveResponse, setInactiveResponse] = useState([])
  const fileInput = useRef(null);


  const field = {
    type: "Learner Dashboard",
    content: "Gritians possess an indomitable spirit . Earning success in the trenches through hard work",
    route: [{ name: "Home", route: "/studentdashboard" }, { name: "Logout", route: "/" }]
  }

  // useEffect(() => {
  //   var data = localStorage.getItem("getprofiledata")
  //   const getprofiledata = JSON.parse(data);
  //   setgetprofiles(getprofiledata)
  //   console.log(getprofiles, "getprofilesgetprofiles")
  // }, [])


  useEffect(() => {
    getallCourseApilist()

    var data = localStorage.getItem("getprofiledata")
    // console.log(data, "datadatadata")
    const getprofiledata = JSON.parse(data);
    setgetprofiles(getprofiledata)
    var dataid = localStorage.getItem("useriddd")
    setsetid(dataid)
    // getcourselistEducatorApi(dataid)
    var dataemailid = localStorage.getItem("emailIddd")
    setemailid(dataemailid)
    var dataname = localStorage.getItem("firstnameee")
    setgetnames(dataname)
    var dataimage = localStorage.getItem("profileImg")
    setgetimage(dataimage)
  }, [])

  const getallCourseApilist = (dataid) => {
    // console.log(payload,"payloadpayload")
    axios.get(`${BASE_URLAPI}` + "course/session/getAllCourse")
      .then((res) => {
        if (res.data.message == "Fetch course session list Successfully") {
          setcourselist(res.data.data.inActiveResponse)
          setInactiveResponse(res.data.data.activeResponse)
        }
      })
      .catch((err) => {

        console.log(err.response)
      })
  }




  const fileDownload = (title) => {
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


    // console.log(payload,"payloadpayload")
    // var data ={
    //   filePath : "6819b68b-e06e-4500-abf0-210c55d7f37e/web/add.png"
    // }
    // axios.post(`${BASE_URLAPI}` + "course/session/download",data)
    //   .then((res) => {
    //     console.log(res.data, "\"fetch course session list Successfully\"")
    //     saveAs(res.data, 'filename.ext');
    //     // if (res.data.message == "\"fetch course session list Successfully\"") {
    //     //   setcourselist(res.data.data.inActiveResponse)
    //     //   setInactiveResponse(res.data.data.activeResponse)
    //     // }
    //   })
    //   .catch((err) => {

    //     console.log(err.response)
    //   })
  }



  const fileUpload = (file) => {
    console.log(CourseID, file, EducatorId, setidd)
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

  const hiddenFileInput = React.createRef();
  const fileInputRef = useRef(null);
  const handleButtonClick = (educatorId,courseid) => {
    
    hiddenFileInput.current.click();
    // handleFileChange()
    setEducatorId(educatorId)
    setCourseID(courseid)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    fileUpload(file)
    // Do something with the selected file
    // console.log(file,educatorId,courseId,"checking");
  }


  return (
    <>
      <Header />


      <Crumbs data={field} />

      {/* <input type="file" onChange={(e)=>setUploadData(e.target.files[0])}/>
  <button onClick={uploadFile}>Upload</button> */}
      <main id="main" className="student-db-main ">

        <section id="student-db" className="student-db py-60">
          <div className="container" >
            <div className="row student-wrap" style={{ backgroundColor: 'lightgrey' }}>
              <div className="col-md-3 mt-0">
                <div className="stu-feature-box" >
                  <div className="student-img-wrap text-center" >


                    <img className='proimage' src={getimage ? getimage : getprofiles ? getprofiles.imageUrl : ellipse} />

                    {/* <video width="320" height="240" controls >
            <source src="http://35.175.147.190:8989/api/download028%20Passing%20Callback%20Functions%20Around.mp4" type="video/mp4"/>
            </video> */}
                    <h5 className="mb-0 fs-5">{getnames ? getnames : getprofiles ? getprofiles.name : "Name"}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-9 ps-lg-5 mt-0">
                <ul className="student-course-details">
                  <li>
                    <div className="feature-box-list d-flex align-items-start">
                      <div className="fb-list-inner">
                        <div className="d-flex mb-0">
                          <h5>Name: </h5><h4><span>{getnames ? getnames : getprofiles ? getprofiles.name : "Name"}</span> </h4>                   </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="feature-box-list d-flex align-items-start">
                      <div className="fb-list-inner">
                        <div className="d-flex mb-0">
                          <h5>Email: </h5><h4><a href="mailto:alex56@gmail.com">{emailid ? emailid : getprofiles ? getprofiles.email : "alex56@gmail.com"}</a></h4></div>
                      </div>
                    </div>
                  </li>
                  {/* <li>
          <div className="feature-box-list d-flex align-items-start">
            <div className="fb-list-inner">
              <div className="d-flex mb-0">
                <h5>Contact Number: </h5><a href="tel:9876543456">9876543456</a>                  </div>
            </div>
          </div>
        </li> */}
                </ul>
                <div class="mt-4 tutor-btn text-right">
                  <a onClick={()=>Navigate("/EditProStudent")} style={{ backgroundColor: '#E75480' }} class="btn btn-default tt-btn rounded"><img src={editdocumenticon} alt="Edit Profile" class="img-fluid me-2" />Edit Profile</a>
                  {/* <a href="#" onClick={() => Navigate("/createcourse")} class="btn btn-default tt-btn rounded ml-3"><img src={editdocumenticon1} alt="Edit Profile" class="img-fluid me-2" />Create Your Course</a> */}
                </div>
                <div className="mt-2 student-progress">
                  <h5 className="mb-0">Attendance: </h5>
                  <span className="progress-count">85%</span>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-label="Example with label" style={{ width: "85%" }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id="session-db" className="session-db py-60 pt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="fs-4 mb-4"><u>My Courses:</u></h2>
              </div>
            </div>
            <div className="row student-wrap px-5" style={{ backgroundColor: 'lightgrey' }}>

              <>
                {InactiveResponse && InactiveResponse.map((data) => {
                  console.log(data)
                  return (
                    <Card courseImageName= {data.courseImageName} bucketUrl={data.bucketUrl} videoDoumentName={data.videoDoumentName} 
                    courseTitle={data.courseTitle} fileDownload={fileDownload} download={download} title={data.courseTitle} description={data.description} 
                    educatorId={data.educatorId} id={data.id} pdfDocumentName={data.pdfDocumentName} />
                    // <div className="col-md-6">
                    //   <div className='row mt-3' >
                    //     <div className="col-md-8">

                    //       <div className="feature-db position-relative">
                            
                    //       <div className="col">
                    //           <h5 className="titlecourse">{data.courseTitle}</h5>
                    //           {/* <span className="className-time">{moment(data.scheduledTime).format("YYYY-MM-DD HH:mm:ss")}</span> */}
                    //         </div>
                    //         <div>

                    //         </div>
                    //         <div className="session-time d-flex align-items-center justify-content-between">
                    //           <a href="#" className="btn btn-default st-btn rounded justify-content-end"
                    //            onClick={() => window.open("https://meet.google.com/kpa-ofau-ihw?authuser=0")}>Join <img src={materialsymbolsvideocamerafront} alt="Student Join" className="img-fluid" /></a>
                    //           <Button className='buttonsdownload'
                    //             onClick={() => {
                    //               fileDownload(data.videoDoumentName)
                    //             }}
                    //           >
                    //             <img src={download} alt="Student Join" className="addimg" />
                    //             Download
                    //           </Button>
                    //         </div>

                    //       </div>
                    //     </div>

                    //     <div className="col-md-4">
                    //       <div className="feature-db butoonsss">

                    //         <img src={reactangle1865}
                    //           alt="student" className="inactivepdfimage mt-2" />

                    //         <div className="butoonsss">
                    //         <Button className='buttonsdownload mt-2'
                    //              onClick={()=>handleButtonClick(data.educatorId,data.id)}>
                    //               <img src={upload} alt="Student Join" className="addimg" />
                    //               Upload</Button>
                    //           <input
                    //             type="file"
                    //             ref={hiddenFileInput}
                    //             style={{ display: 'none' }}
                    //             onChange={handleFileChange}
                    //           />
                            
                    //         </div>
                    //         <div className="butoonsss">

                    //           <Button className='buttonsdownload mt-2 mb-2'
                    //             onClick={() => {
                    //               fileDownload(data.pdfDocumentName)
                    //             }}
                    //           >
                    //             <img src={download} alt="Student Join" className="addimg" />
                    //             Download
                    //           </Button>
                    //         </div>
                    //       </div>
                    //     </div>
                    //   </div>

                    // </div>

                  )
                })}
              </>
            </div>

          </div>
        </section>


        <section id="popular-db" className="popular-db pt-0">
          <div className="container">
            <div className="row" >
              <div className="col-md-12">
                <h2 className="fs-4 mb-4"><u>Upcoming Sessions</u></h2>
              </div>
            </div>
            <div className="row student-wrap px-4" style={{ backgroundColor: 'lightgrey' }}>
              {/* <Popularcourses /> */}
              {courselist.map((data) => {
                return (
                  <Card key={data.course} courseImageName={data.courseImageName} 
                    title={data.courseTitle} isUpcomingSession/>
                )
              })}

            </div>
          </div>
        </section>

      </main>

      <Footer />


    </>
  )
}




export default Studentdashboard