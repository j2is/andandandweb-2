"use client";

import { useEffect, useState, useCallback } from "react";
import { useAppStore } from "@/stores/AppStore";
import { useInView } from "framer-motion";


export default function useNavColourSwitch({ isInView, isInverse = false, container }) {
	const [{ isPresentationNavInverse }, { setIsPresentationNavInverse }] = useAppStore();
	const isContainerInView = useInView(container);

	useEffect(() => {
		if (isInView) {
			setIsPresentationNavInverse(isInverse);
		}
	}, [isInView, isInverse]);

	useEffect(() => {
		if (isContainerInView) {
			setIsPresentationNavInverse(isInverse);
		}
	}, [isContainerInView, isInverse]);

	return null;
}
