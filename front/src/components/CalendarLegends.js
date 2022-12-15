import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"

export default function CalendarLegends(){
    const types = {
        "Day-Shift": "day-shift",
        "Night-Shift": "night-shift",
        "Leave": "leave",
        "Booked": "booked"
    }

    return(
        <>
        {Object.entries(types).map(([type, style]) => {
            let bgColor
            switch (style) {
                case "day-shift":
                    bgColor = "#dbd504"
                    break
                case "night-shift":
                    bgColor = "#1604db"
                    break
                case "leave":
                    bgColor = "#0b9e06"
                    break
                case "booked":
                    bgColor = "#d46402"
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