import styled from 'styled-components'

const PreviewBarStyles = styled.div`
	position: fixed;
	bottom: 8px;
	left: 0;
	right: 0;
	z-index: 10;
	padding: 0 8px;

	@media (min-width: 768px) {
		bottom: 16px;
		padding: 0 16px;
	}

	.container {
		margin: 0 auto;
		max-width: 672px;
		border-radius: 6px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		background-color: rgba(255, 255, 255, 0.8);
		padding: 16px;
		backdrop-filter: blur(10px);
	}

	.flex-wrapper {
		display: flex;
	}

	.content {
		margin-left: 12px;
		flex: 1;

		@media (min-width: 768px) {
			display: flex;
			justify-content: space-between;
		}
	}

	.preview-text {
		font-size: 1.4rem;
		color: rgb(51, 65, 85);

		@media (prefers-color-scheme: dark) {
			color: rgb(203, 213, 225);
		}
	}

	.exit-link {
		margin-top: 12px;
		font-size: 14px;
		opacity: 0.8;

		@media (min-width: 768px) {
			margin-left: 24px;
			margin-top: 0;
		}
	}
`

export default PreviewBarStyles