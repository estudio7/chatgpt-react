import React, { useState, useEffect, useCallback, ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from 'next/router';

import { StyledCard, Data, Title} from "./styles";

const BlankCard: React.FC= ({}) => {
	const router = useRouter();
	
	return (
		<StyledCard sx={{justifyContent: 'center', alignItems:'center', display:'flex'}}>
			<Box sx={{ width:"90%", cursor: "pointer"}}>
				<Data sx={{justifyContent: 'center'}} onClick={()=>router.push('/colleges')}>
					<span>Add more colleges</span>
				</Data>
			</Box>
		</StyledCard>
	);
};

export default BlankCard;
