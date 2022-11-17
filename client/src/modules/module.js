const initialState = {
  session:"",
  snackbar:{
    snackbarToggle:false,
    explain:"",
    severity:""
  },
  progress:{
    progressToggle:false,
  },
  user: {
    userinfo:[]
  },
  confirm: false
}
export default (state = initialState, action) =>{

  switch (action.type){
    case "SESSION":
      return {...state, session: action.session};
    case "SNACKBAR/ON":
      return {...state, snackbar: {...state.snackbar, snackbarToggle: action.snackbar.snackbarToggle, explain: action.snackbar.explain, severity:action.snackbar.severity }};
    case "SNACKBAR/OFF":
      return {...state, snackbar: {...state.snackbar, snackbarToggle: action.snackbar.snackbarToggle}};
    case "PROGRESS":
      return {...state, progress: {...state.progress, progressToggle: action.progress.progressToggle}};
    case "USER/USERINFO":
      return {...state, user: {...state.user, userInfo: action.user.userInfo}};
    case "CONFIRM":
      return {...state, confirm: action.confirm}
    default:
      return {...state};
  }
};

