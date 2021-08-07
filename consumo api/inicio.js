var $api = localStorage.getItem('api')
var url  = `${$api}/pruebapi/public/api`
var token = localStorage.getItem('token')
var text = document.getElementById('warnText')
var $id = localStorage.getItem('myId')
var $name = document.getElementById('name')
var $email = document.getElementById('email')
var $rol = document.getElementById('rol')
var rol = localStorage.getItem('rol')
var listUsers = document.getElementById('listUsers')
//localStorage.removeItem('token')

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
		showUsers()
		showDataUser()
	}
}

function showDataUser()
{
	const editMe = document.getElementById('editMe')
	editMe.setAttribute('onClick',`edit(${$id})`)

	const name = localStorage.getItem('name')
	$name.innerHTML = name

	const email = localStorage.getItem('email')
	$email.innerHTML = `${email}`

	$rol.innerHTML = `${rol}`
}

function showUsers()
{	
	fetch(`${url}/profile`,{
		headers:{
			'Authorization':`Bearer ${token}`,
		},
		method: "GET",
	})
	.then((response)=>{
		return response.json()
	})
	.then((data)=>{
		if(data.response)
		{
			if(rol == 'Administrator')
			{
				
				let nodes = data.data.map((user) => {
					let tr = document.createElement('tr')
					tr.appendChild(document.createElement('th')).textContent = user.id
					tr.appendChild(document.createElement('th')).textContent = user.name
					tr.appendChild(document.createElement('th')).textContent = user.identification
					tr.appendChild(document.createElement('th')).textContent = user.email
					tr.appendChild(document.createElement('th')).textContent = user.rol

					const a = document.createElement('a')
					a.setAttribute('class','nav-link active')
					a.setAttribute('onClick',`edit(${user.id})`)
					a.textContent = 'Editar'
					tr.appendChild(document.createElement('th').appendChild(a))

					return tr
				})

				listUsers.append(...nodes)
				text.innerHTML = data.message
			}
			else
			{
				text.innerHTML = `Algunos datos no son visibles  por tu rol ${rol}`
			}
		}
		else
		{
			localStorage.removeItem('token')
			location.href ="login.html"
		}
	})
	.catch((error)=>{
		console.log(error)
	})
}

function edit(id)
{
	localStorage.setItem('id',id)
	location.href ="edit.html"
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