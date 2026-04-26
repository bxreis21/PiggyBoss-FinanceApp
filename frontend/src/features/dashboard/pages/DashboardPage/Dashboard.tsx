import PiggyBox from "../../../../shared/components/PiggyBox/PiggyBox.js";

import Box from "../../layouts/Box.js";

export default function Dashboard() {
    return (
        <div className="h-[95%] w-full p-[2.5%] grid grid-rows-[5fr_7fr] grid-cols-[4fr_2fr_2fr] gap-7">

            <PiggyBox variant='primary'>
                <Box
                    headerCenter="Dashboard Card 1"
                    headerLeft="Left"
                    headerRight="Right"
                    body=""
                />
            </PiggyBox>

            <PiggyBox variant='primary'>
                <Box
                    headerCenter="Dashboard Card 2"
                    headerLeft="Left"
                    headerRight="Right"
                    body=""
                />
            </PiggyBox>

            <PiggyBox variant='primary'>
                <Box
                    headerCenter="Dashboard Card 3"
                    headerLeft="Left"
                    headerRight="Right"
                    body=""
                />
            </PiggyBox>

            <PiggyBox variant='primary'>
                <Box
                    headerCenter="Dashboard Card 4"
                    headerLeft="Left"
                    headerRight="Right"
                    body=""
                />
            </PiggyBox>

            <PiggyBox variant='primary'>
                <Box
                    headerCenter="Dashboard Card 5"
                    headerLeft="Left"
                    headerRight="Right"
                    body=""
                />
            </PiggyBox>

            <PiggyBox variant='primary'>
                <Box
                    headerCenter="Dashboard Card 6"
                    headerLeft="Left"
                    headerRight="Right"
                    body=""
                />
            </PiggyBox>

        </div>
    );
}