var text = document.getElementById('warnText')
var interfazLogin = document.getElementById('interfazLogin')
//localStorage.removeItem('token')
index()
enter()

function index()
{
	if(localStorage.getItem('token') === 'undefined' || localStorage.getItem('token') === null)
	{
		login()
	}
	else
	{
		interfazLogin.style.display = 'none'
		location.href ="inicio.html";
	}
}

function login()
{
	const $btnLogin = document.getElementById('btnLogin')

	$btnLogin.addEventListener('click',(e) => {
		let $email = document.getElementById('email')
		$email = $email.value
		let $pasw  = document.getElementById('pasw')
		$pasw = $pasw.value

		text.innerHTML = ''

		apiLogin($email,$pasw)
	})
}

function apiLogin($email,$pasw)
{
	const $api = document.getElementById('api').value
	const url  = `${$api}/pruebapi/public/api`

	let data = {
		"email":$email,
		"password":$pasw
	}
	
	fetch(`${url}/login`,{
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json',
		},
		body:JSON.stringify(data),
		method: "POST",
	})
	.then((response)=>{
		return response.json()
	})
	.then((data)=>{
		if(data.errors)
		{
			text.innerHTML = `
				${data.errors.email ? data.errors.email[0]:''} <br/>
				${data.errors.password ? data.errors.password[0]:''} <br/>
			`
		}
		else
		{
			text.innerHTML = `
				${data.message}
			`

			localStorage.setItem('token',data.data.token)
			localStorage.setItem('myId',data.data.id)
			localStorage.setItem('name',data.data.name)
			localStorage.setItem('email',data.data.email)
			localStorage.setItem('rol',data.data.rol)
			localStorage.setItem('api',$api)

			setTimeout(function(){
				location.reload()
			},3000)
		}
		
	})
	.catch((error)=>{
		console.log(error)
	})
}

function enter()
{
	window.addEventListener('keydown',(e) => {

		if (e.keyCode === 13)
		{
       		let $email = document.getElementById('email')
			$email = $email.value
			let $pasw  = document.getElementById('pasw')
			$pasw = $pasw.value

			text.innerHTML = ''

			apiLogin($email,$pasw)
    	}
	})	
}