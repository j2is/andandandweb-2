"use client";

import React, { useRef, useState, useEffect } from "react";
import NotificationsStyles from "./Notifications.styled";
import { useAppStore } from "../../stores/AppStore";
import useKeyPress from "../../lib/useKeyPress";
import { motion, AnimatePresence } from "framer-motion";
import isDev from "../../lib/isDev";
import Button from '../Button';
import Icon20px from '../Icon20px';
import NotificationAutoHiding from '../NotificationAutoHiding';
// import { parseCookies, setCookie, destroyCookie } from "nookies";

function Notifications({ location, history, Component }) {
	const escPress = useKeyPress("Escape");
	const showCookieTimer = useRef();
	const [
		{ notifications, isCookieLayerShown },
		{
			addNotification,
			removeNotification,
			removeAllNotifications,
			setIsCookieLayerShown,
		}
	] = useAppStore();

	useEffect(() => {
		if (escPress && notifications?.length) {
			removeAllNotifications();
		}
	}, [escPress, notifications]);

	const showCookieLayerWithDelay = () => {
		clearTimeout(showCookieTimer.current);
		showCookieTimer.current = setTimeout(() => {
			setIsCookieLayerShown(true);
		}, 2000);
	};

	return (
		<NotificationsStyles>
			<ul>
				<AnimatePresence>
					{!!notifications?.length &&
						notifications.map(item => (
							<NotificationAutoHiding key={item.key} isError={item?.isError} i={item?.key} message={item.message} />
						))}
				</AnimatePresence>
			</ul>
		</NotificationsStyles>
	);
}

export default Notifications;
