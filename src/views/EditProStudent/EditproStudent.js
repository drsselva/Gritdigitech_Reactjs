import React, { useEffect } from 'react'
import Header from '../../component/Header/Header'
import Footer from "../../component/Footer/Footer"
import "../../css/aos.css"
import "../../css/main.css"
import { useState } from 'react'
import axios from 'axios'
import personstudyingatadesk from "../../assets/img/study/personstudyingatadesk2.jpg"
import { BASE_URL1 } from '../constant'
import Toast, { toast } from 'react-toastify'
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import './styles.css'
import { useNavigate } from 'react-router-dom'

function EditProStudent() {
    const Navigate = useNavigate()
    const [Firstname, setFirstname] = useState("")
    const [contentImage, setcontentImage] = useState("")
    const [Phoenum, setPhoenum] = useState(new Date())
    const [setLearnerid, setsetLearnerid] = useState("")

    useEffect(() => {
        var useriddd = localStorage.getItem("useriddd")
        setsetLearnerid(useriddd)
    }, [])

    const submit = () => {
        if (Firstname == "") {
            toast.error("Please Enter the Full Name")
        }
        else if (Phoenum == "") {
            toast.error("Please Enter the Phone Number")
        }
        else if (contentImage == "") {
            toast.error("Please Select the Profile Image")
        }

        else {
            var data = {
                "id": setLearnerid,
                "firstName": Firstname,
                "lastName": "",
                "phone": Phoenum,
                "profileImg": contentImage
            }


            axios.put("http://35.175.147.190:8989/api/user/update", data)
                .then((res) => {
                    console.log(res.data, "responsecreatecourse")
                    getuserbyid()
                    toast.success("User Updated Successfully")

                    // Navigate("/educatordashboard")
                })
                .catch((err) => {
                    console.log(err.response.data, "ssssssssssss")
                })

        }
    };



    const getuserbyid = () => {
        console.log("check")
        axios.get("http://35.175.147.190:8989/api/user/get/"+setLearnerid)
            .then((res) => {
                console.log(res.data, "getuserbyidgetuserbyid")
                localStorage.setItem("profileImg", res.data.data.profileImg)
                localStorage.setItem("firstnameee", res.data.data.firstName)
                Navigate("/studentdashboard")
            })
            .catch((err) => {
                console.log(err.response.data, "ssssssssssss")
            })
    };

    const contentimage64 = (files) => {
        const reader = new FileReader()

        reader.readAsDataURL(files)

        reader.onload = () => {
            //   console.log('called: ', reader.result)
            setcontentImage(reader.result)
        }

    }
    return (
        <>
            <Header />
            <main id="main" class="create-course-wrapper data-img tp-page sticked-header-offset">
                <section id="create-course" class="create-course pt-large">
                    <div class="container aos_init aos-animate" >
                        <div class="row gy-5 align-items-center create-course-banner-wrap" >
                            <div class="col-lg-6 d-flex flex-column res-mt justify-content-center relative text-center text-lg-start"
                                data-aos="fade-up" data-aos-easing="ease-out-cubic"
                                data-aos-duration="1000">
                                <div class="create-course-inner bg-white position-relative">
                                    <form action="#" class="create-course-form">

                                        <div class="form-group">
                                            <input type="text" onChange={(e) => setFirstname(e.target.value)} class="form-control" placeholder="First Name" required />
                                        </div>

                                        <div class="form-group">
                                            <input type="text" onChange={(e) => setPhoenum(e.target.value)} class="form-control" placeholder="Phone Number" required />
                                        </div>


                                        <div class="form-group">
                                            <label class="uploadd uploading uploadingtext">Profile Image</label>
                                            <input type="file" onChange={(e) => contentimage64(e.target.files[0])} name="fileupload" id="fileupload" class="form-control mb-3" placeholder="Upload content Image" />
                                        </div>




                                        <div class="form-group mb-0">
                                        </div>

                                    </form>
                                    <button onClick={submit} class="form-control btn btn-primary rounded submit px-3">Upload</button>

                                </div>
                            </div>
                            <div class="col-lg-6 text-center ps-lg-5" data-aos="fade-down" data-aos-easing="ease-out-cubic"
                                data-aos-duration="1000">
                                <div class="create-course-img">
                                    <img src={personstudyingatadesk} class="img-fluid" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>


                </section>
            </main>
            <Footer />
        </>
    )
}

export default EditProStudent