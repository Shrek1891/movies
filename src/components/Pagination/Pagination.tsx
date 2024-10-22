import useStyles from './styles.ts'
import {Button, Typography} from "@mui/material";

const Pagination = ({currentPage, setPage, totalPages}) => {
    const classes = useStyles()
    const handleNext = () => {
        if (currentPage !== totalPages) {
            setPage((prev) => prev + 1)
        }
    }
    const handlePrev = () => {
        if (currentPage !== 1) {
            setPage((prev) => prev - 1)
        }
    }
    if (totalPages == 0) return null
    return (
        <div className={classes.container}>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                size="large"
                type="button"
                onClick={handlePrev}
            >
                Prev
            </Button>
            <Typography
                variant='h4'
                className={classes.pageNumber}
            >
                {currentPage}
            </Typography>
            <Button
                onClick={handleNext}
                className={classes.button}
                variant="contained"
                color="primary"
                size="large"
                type="button"
            >
                Next
            </Button>
        </div>
    )
}
export default Pagination