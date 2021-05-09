import classes from './DrawerToogle.module.css'
const DrawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={()=>props.clicked(true)}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)
export default DrawerToggle;