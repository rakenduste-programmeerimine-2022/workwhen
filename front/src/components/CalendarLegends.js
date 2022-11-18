import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"

export default function CalendarLegends(){
    const types = {
        "Day shift": "day-shift",
        "Night shift": "night-shift",
        "Vacation": "vacation",
        "Booked": "booked"
    }

    return(
        <>
        {Object.entries(types).map(([type, style]) => {
            let bgColor
            switch (style) {
                case "day-shift":
                    bgColor = "rgb(255, 255, 0)"
                    break
                case "night-shift":
                    bgColor = "rgb(102, 0, 255)"
                    break
                case "vacation":
                    bgColor = "rgb(51, 204, 51)"
                    break
                case "booked":
                    bgColor = "rgb(255, 153, 0)"
                    break
            }
            const Legend = styled(Button)(({ theme }) => ({
                backgroundColor: bgColor,
                "&.Mui-disabled": {
                    color: theme.palette.getContrastText(bgColor),
                }
            }))
            return(
                <Legend
                    variant="outlined"
                    disableRipple
                    disabled
                    disableFocusRipple
                    sx={{ marginRight: "1%", borderRadius: "25px" }}
                >
                    {type}
                </Legend>
            )
        })}
        </>
    )
}