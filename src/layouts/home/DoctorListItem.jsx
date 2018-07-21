export const DoctorListItem = ({ doctor, classes }) => {
    const { name, bio ,rating } = doctor
    return (
      <div>
        <Typography variant='headline' component='h2'>
          {name}
        </Typography>      
        <CardActions>
          <Button color='primary'>Hire</Button>
        </CardActions>
      </div>
    )
}