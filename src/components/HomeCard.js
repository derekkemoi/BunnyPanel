import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Divider } from '@mui/material';

import { useAtom } from 'jotai';
import { userObject } from "../state";
import { AccountBalanceWallet, AccountCircleOutlined, Loop, Loyalty } from '@mui/icons-material';

export default function HomeCard() {
    const navigate = useNavigate()

    const [user, setUser] = useAtom(userObject)
    const viewEarnings = () => {
        navigate("/profile")
    }
    const viewRefarrals = () => {
        navigate("/referrals")
    }
    return (
        <div>
            <Card sx={{ mt: 2 }} variant="soft" style={{
                backgroundColor: "#FDBF00",
                paddingTop: "12px",
            }}>
                <div>
                    <Typography>Your Total Balance</Typography>
                    <Typography level="title-lg">
                        Ksh {user.accountBalance}.00</Typography>
                </div>
                <Divider />
                <CardContent orientation="horizontal">
                    <div align="left">
                        <Button
                            onClick={viewEarnings}
                            variant="solid"
                            endDecorator={<AccountCircleOutlined />}
                            style={{ backgroundColor: '#00CC71',borderRadius: "5em" }}
                            sx={{ ml: 'auto', alignSelf: 'center' }}
                        >
                            Dashboard
                        </Button>
                    </div>
                    <Button
                        onClick={viewRefarrals}
                        variant="solid"
                        endDecorator={<Loop />}
                        style={{ backgroundColor: '#00CC71',borderRadius: "5em" }}
                        sx={{ ml: 'auto', alignSelf: 'center' }}
                    >
                        Referrals
                    </Button>
                </CardContent>

            </Card>
        </div>
    )
}
