var $api = localStorage.getItem('api')
var url  = `${$api}/pruebapi/public/api`
var token = localStorage.getItem('token')
var text = document.getElementById('warnText')
index()
logout()

function index()
{
	if(localStorage.getItem('token') === 'undefined' || localStorage.getItem('token') === null)
	{
		location.href ="login.html"
	}
	else
	{
		enter()
	}
}

function addUser()
{

	let payload = {
		"rol_id":document.getElementById('rol_id').value,
		"name":document.getElementById('name').value,
		"identification":document.getElementById('identification').value,
		"email":document.getElementById('email').value,
		"cellphone":document.getElementById('cellphone').value,
		"password":document.getElementById('pasw').value
	}

	fetch(`${url}/profile`,{
		headers:{
			'Authorization':`Bearer ${token}`,
			'Accept':'application/json',
			'Content-Type':'application/json'
		},
		method: "POST",
		body:JSON.stringify(payload)
	})
	.then((response)=>{
		if(response.status === 401)
		{
			localStorage.removeItem('token')
			location.reload()
		}
		else
		{
			return response.json()
		}
	})
	.then((data)=>{
		console.log(data)
		if(data.errors || !data.response )
		{
			text.innerHTML = `El usuario ${data.error}`
		}
		else{
			if(data.response)
			{	
				text.innerHTML = `${data.message}`
			}
		}
	})
	.catch((error)=>{
		console.log(error)
	})
}

function enter()
{
	const btn = document.getElementById('btn')

	btn.addEventListener('click',(e) => {
   		text.innerHTML = 'Agregando usuario...'
		addUser()
	})	
}

function logout()
{
	let logout = document.getElementById('apiLogout')

	logout.addEventListener('click',() => {

		fetch(`${url}/logout`,{
			headers:{
				'Authorization':`Bearer ${token}`
			},
			method: "POST",
		})
		.then((response)=>{
			return response.json()
		})
		.then((data)=>{
			localStorage.removeItem('token')
			location.href ="login.html"
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}