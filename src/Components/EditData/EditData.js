import React, { useState, useEffect } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel, Badge } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../firebase'
import {useSelector, useDispatch} from "react-redux"
import { storage } from '../firebase'
import EditIcon from '@material-ui/icons/Edit';
import {GET_USER_IMG } from '../../Redux/UserDetails/userTypes'



const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', 
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	large: {
		width: theme.spacing(15),
		height: theme.spacing(15),
	  }
})

const SmallAvatar = withStyles((theme) => ({
	root: {
	  width: 32,
	  height: 32,
	  border: `2px solid ${theme.palette.background.paper}`,
	  background: "pink"
	},
  }))(Avatar);



function EditData(props) {
	const { classes } = props
	const dispatch = useDispatch()
	const data = useSelector(state => state.users.userData);

	const [name, setName] = useState(data.name)
	const [lname, setLName] = useState(data.lname)
	const [address, setAddress] = useState(data.address)
	const [phone, setPhone] = useState(data.phone)
	const [age, setAge] = useState(data.age)
	const [image, setImage] = useState(null);
	const [url, setUrl] = useState(data.url);

	//const url = useSelector(state => state.users.imgUrl);

	const handleChange = e => {
		if (e.target.files[0]) {
		  setImage(e.target.files[0]);
		   handleUpload(e)
		}
	  };

	  const onOpenFiles = () => {
		document.getElementById("pic").click();
		  let em = document.getElementById("pic")
		  em.onchange = function(e) {
			console.log(e.value);
			handleChange(e)
		  }
		
	  };
	
	  const handleUpload = (e) => {
		  let image = e.target.files[0]
		  console.log("img:===> ",image)
		const uploadTask = storage.ref(`images/${image.name}`).put(image);
		uploadTask.on(
		  "state_changed",
		  snapshot => {
			const progress = Math.round(
			  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			);
			//setProgress(progress);
		  },
		  error => {
			console.log(error);
		  },
		  () => {
			storage
			  .ref("images")
			  .child(image.name)
			  .getDownloadURL()
			  .then(url => {
				setUrl(url)
				dispatch({type:GET_USER_IMG,imgUrl:url})
			  });
		  }
		);
	  };
	
	  console.log("image: ", image);

	

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Edit Account
       			</Typography>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false }>
				
				<input type="file" id="pic" style={{display:"none"}} />
				
				<FormControl margin="normal"  fullWidth>
					
					<div style={{alignSelf:"center"}}>
					<Badge
						overlap="circle"
						anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
						}}
						badgeContent={<SmallAvatar alt="Edit">
							<EditIcon fontSize="small" /></SmallAvatar> }
					>
					
					<Avatar alt="firebase-image" onClick={onOpenFiles}  src={url || "http://via.placeholder.com/300"}  className={classes.large} />
					</Badge>
					</div>
					</FormControl>

					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="name">First Name</InputLabel>
						<Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="lname">Last Name</InputLabel>
						<Input id="lname" name="lname" autoComplete="off" autoFocus value={lname} onChange={e => setLName(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="age">Age</InputLabel>
						<Input id="age" name="age" autoComplete="off" autoFocus value={age} onChange={e => setAge(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="phone">Phone Number</InputLabel>
						<Input id="phone" name="phone" autoComplete="off" autoFocus value={phone} onChange={e => setPhone(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="address">Address</InputLabel>
						<Input id="address" name="address" autoComplete="off" autoFocus value={address} onChange={e => setAddress(e.target.value)} />
					</FormControl>
					
					{/* <FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email Address</InputLabel>
						<Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
					</FormControl> */}
					{/* <FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="quote">Your Favorite Quote</InputLabel>
						<Input name="quote" type="text" id="quote" autoComplete="off" value={quote} onChange={e => setQuote(e.target.value)}  />
					</FormControl> */}

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={onSave}
						className={classes.submit}>
						Save
          			</Button>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/dashboard"
						className={classes.submit}>
						Go back to Dashboard
          			</Button>
				</form>
			</Paper>
		</main>
	)

	async function onSave() {
		try {
			
			await firebase.updateUserData(name,lname,age,phone,address,url)
			props.history.replace('/dashboard')
		} catch(error) {
			alert(error.message)
		}
	}
}

export default withRouter(withStyles(styles)(EditData))