"use client"

import React, { useRef, useEffect, useCallback, useState } from 'react'

const resizeCanvasToDisplaySize = (canvas, width, height) => {
	const dpr = window.devicePixelRatio || 1;
	const displayWidth = Math.round(width * dpr);
	const displayHeight = Math.round(height * dpr);

	if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
		canvas.width = displayWidth;
		canvas.height = displayHeight;
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;
		return true;
	}
	return false;
}

const isOffscreenCanvasSupported = () => {
	return typeof OffscreenCanvas !== 'undefined'
}

export const useCanvas = (draw, options = {}) => {
	const canvasRef = useRef(null)
	const containerRef = useRef(null)
	const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
	const animationFrameId = useRef()
	const offscreenCanvas = useRef()

	const updateContainerSize = useCallback(() => {
		if (containerRef.current) {
			const { width, height } = containerRef.current.getBoundingClientRect();
			setContainerSize({ width, height });
		}
	}, [])

	const renderFrame = useCallback((context, canvas, frameCount) => {
		if (options.predraw) options.predraw(context, canvas, containerSize.width, containerSize.height)
		draw(context, frameCount)
		if (options.postdraw) options.postdraw(context)
	}, [draw, options, containerSize])

	useEffect(() => {
		updateContainerSize()
		window.addEventListener('resize', updateContainerSize)
		return () => window.removeEventListener('resize', updateContainerSize)
	}, [updateContainerSize])

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		let context
		let frameCount = 0

		const render = () => {
			frameCount++
			if (isOffscreenCanvasSupported() && options.useOffscreen) {
				if (!offscreenCanvas.current) {
					offscreenCanvas.current = new OffscreenCanvas(containerSize.width, containerSize.height)
				}
				context = offscreenCanvas.current.getContext('2d')
				const bitmapRenderer = canvas.getContext('bitmaprenderer')

				renderFrame(context, offscreenCanvas.current, frameCount)

				createImageBitmap(offscreenCanvas.current).then(bitmap => {
					bitmapRenderer.transferFromImageBitmap(bitmap)
				})
			} else {
				context = canvas.getContext(options.context || '2d')
				renderFrame(context, canvas, frameCount)
			}

			animationFrameId.current = window.requestAnimationFrame(render)
		}

		render()

		return () => {
			if (animationFrameId.current) {
				window.cancelAnimationFrame(animationFrameId.current)
			}
		}
	}, [renderFrame, options, containerSize])

	return { canvasRef, containerRef }
}

const defaultPredraw = (context, canvas, width, height) => {
	context.save()
	resizeCanvasToDisplaySize(canvas, width, height)
	context.clearRect(0, 0, width, height)
}

const defaultPostdraw = (context) => {
	context.restore()
}

const Canvas = props => {
	const { draw, predraw = defaultPredraw, postdraw = defaultPostdraw, useOffscreen = false, ...rest } = props
	const { canvasRef, containerRef } = useCanvas(draw, { predraw, postdraw, useOffscreen });

	return (
		<div ref={containerRef} style={{ width: '100%', height: '100%' }}>
			<canvas ref={canvasRef} {...rest} style={{ width: '100%', height: '100%' }} />
		</div>
	);
}

export default Canvas