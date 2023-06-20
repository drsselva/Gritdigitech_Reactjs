import Axios from 'axios';
import { toast } from "react-toastify";

// toast.configure();

const loginId = 'loginId';

	
const helper = {

	backendAPI: function () {

		// let url = "http://35.175.147.190:8989/api/";
    let url = "http://35.175.147.190:8989/api/loginUser/Test@123.com/Test@123"

		return url;
	},

	PostData: async function (url, params) {

		let axiosConfig;

		if (localStorage.getItem(loginId)) {

			axiosConfig = {
				headers: {
					"Content-Type": "application/json;charset=UTF-8",
					"Access-Control-Allow-Origin": "true",
					"x-access-token": localStorage.getItem(loginId)
				}
			};

		} else {

			axiosConfig = {
				headers: {
					"Content-Type": "application/json;charset=UTF-8",
					"Access-Control-Allow-Origin": "true",
				}
			};
		}

		return await Axios.post(url, params, axiosConfig).then((res) => {

			try {

				if (res.status === 200) {

					let output = res.data;

					if (output.status) {

						if (output.message) {

							toast.success(output.message, { theme: 'colored'});
						}

					} else {

						if (output.message === 'You session is over, So kindly login again with your credentials!' || output.message === 'Session is not valid') 
						{

							toast.error('You session have timed out !', { position: toast.POSITION.TOP_RIGHT, theme: 'colored' });

							localStorage.clear();

							window.location.href = "/login";

						} else {

							if (output.message) {

								toast.error(output.message, { position: toast.POSITION.TOP_RIGHT, theme: 'colored'});
							}
						}
					}

					return output;

				} else {

					toast.error('Internal Server Error!', { position: toast.POSITION.TOP_RIGHT, theme: 'colored'});
				}

			} catch (e) {

				toast.error("Internal Server Error!", { position: toast.POSITION.TOP_RIGHT, theme: 'colored'});
			}

		}).catch((e) => {

			toast.error("Internal Server Error!", { position: toast.POSITION.TOP_RIGHT, theme: 'colored'});
		});
	},

	GetData: async function (url) {

		let axiosConfig;


		if (localStorage.getItem(loginId)) {
			axiosConfig = {
				headers: {
					"Content-Type": "application/json;charset=UTF-8",
					"Access-Control-Allow-Origin": "true",
					"x-access-token": localStorage.getItem(loginId)
				}
			};
		}
		else {
			axiosConfig = {
				headers: {
					"Content-Type": "application/json;charset=UTF-8",
					"Access-Control-Allow-Origin": "true",
				}
			};
		}

		return await Axios.get(url, axiosConfig)
			.then(res => {
				return res.data;
			}).catch((e) => {
				try {
					if (e.response.status === 401) {
						window.location.href = '';
					} else {
						return { 'status': false, 'message': e };
					}
				} catch (e) {
					return { 'status': false, 'message': 'Something went wrong' };
				}
			});
	},

}

export default helper;