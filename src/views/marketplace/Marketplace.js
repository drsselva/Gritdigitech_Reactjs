import React, { useEffect } from 'react'
import { useState } from 'react'
import "../../css/aos.css"
import "../../css/main.css"
import Studentlogin1 from "../../assets/img/study/student-login1.svg"
import Footer from '../../component/Footer/Footer'
import Header from '../../component/Header/Header'
import Crumbs from '../../component/Crumbs/Crumbs'
import python from "../../assets/img/course/course-python.jpg"

import "../../css/main.css"
import axios from 'axios'
function Marketplace() {

  const [courseList,setCourseList] = useState([])

  const field = {
    type : "Market Place",
    content : "Socially Purpose Driven Business Providing A Next Generation Learning as a Service Platform (GRIT LaaS)",
    route : [{name : "Home",route : "/home"},{name: "Lass",route :"/home"},{name: "Learner",route :"/home"}]
  }

  useEffect(() => {

    axios.get("http://35.175.147.190:8989/api/getAllCourse")
    .then((res)=>{
      console.log(res.data)
      setCourseList(res.data)
    })
   
  }, [])
  
  return (
    <> 
    <Header/>

<Crumbs data={field}/>

     <main id="main" class="marketplace-main bg-grey-light">
  <section id="learning-process" class="learn-process pb-5 mb-1">
 


          
  </section>




  <section id="filter-section" class="filter-section pt-4 pb-0">
      <div class="container">
    
        <div class="row filter-inner-wrap align-items-center">
            <div class="col-md-6">
              <div class="input-group">
                <div class="form-outline w-75">
                  <input type="search" id="form1" class="form-control" placeholder="What do you want to search ?" />
                </div>
                <button type="button" class="btn btn-primary">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>
            <div class="col-md-6 d-flex justify-content-end">
              <div class="filter-btn">
                <div class="form-inline w-auto">
                  <div class="d-flex align-items-center justify-content-lg-start me-4">
                    <a href="#" class="btn btn-default btn-rd">All Courses</a>            
                    </div>
                </div>
              </div>
            
              <div class="filter-inner">
                <div class="form-inline">
                  <select class="mr-2 form-control">
                     <option>All</option>
					 <option>-Popularity-</option>                 
                    <option>-Low to High-</option>
                    <option>-High to Low-</option>
                  </select>
                </div>
              </div>
              
            </div>
        </div>
    </div>
  </section>


  <section id="marketplace" class="steps-container pt-5 pb-5">
      <div class="container">
          <div class="row steps-wrap">
{courseList && courseList.map((data)=>{
  return(
<div class="col-lg-3 col-md-6 d-flex align-items-stretch" >
                  <div class="course-item position-relative" title="Python Course">
                  <a href="#" class="course-link"></a>
                    <div class="course-img">
                      <a href="" title="Tnpsc Group Exams"><img src={python} class="img-fluid" alt="Learn Python" /></a>
                     
                    </div>
                      <div class="course-content">
                          <ul class="course-info d-flex align-items-center justify-content-between ps-0">
                            <li class="list-group-item" title="Our Clients"><i class="bi bi-person-workspace me-1"></i> 25 Students</li>
                            <li class="list-group-item" title="Course Weeks"><i class="bi bi-clock me-1"></i> 3 Weeks</li>
                          </ul>
                          <div class="course-wrap">
                          <div class="d-flex justify-content-between align-items-center">
                              <h5 class="mb-2"><a href="" class="course-author" title="Educator"><i class="bi bi-person-circle me-2"></i>GRIT Digitech</a></h5>
                          </div>
                          <h4><a href="" title="Learn Course">{data.courseName}</a></h4>
                        </div>
                          <ul class="trainer-info d-flex align-items-center justify-content-between ps-0 mb-0">
                            <li class="list-group-item" title="Books"><i class="bi bi-book me-1"></i> Docs: 6</li>
                            <li class="list-group-item" title="Test Papers"><i class="bi bi-person me-1"></i> Test Papers: 6</li>
                          </ul>
                      </div>
                  </div>
              </div>
  )
})}
              
            
           
         
          </div>
      </div>
  </section>

  <section id="course-pagination" class="course-pagination pt-0">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        
      <div class="pagination-wrap text-center">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link w-auto" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link w-auto" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
      </div>
    </div>
  </div>
</section>



  </main>

    

    <Footer/>


     </>

    )
}

export default Marketplace