export const typeQuery = `*[(slug.current == $slug || store.slug.current == $slug) && _type != 'routes']|order(_updatedAt desc)[0]._type`

const loadingThreshold = process?.env?.loadingThreshold ? Number(process.env.loadingThreshold) : 2;

const image = `
	image {
		...,
		image {
			_type,
			alt,
			asset->
		}
	}
`

const video = `
  video {
    video {
      _type,
      asset->
    },
    shortLoop {
      _type,
      asset->
    },
		mobileVideo {
      _type,
      asset->
    },
    mobileShortLoop {
      _type,
      asset->
    },
    type
  }
`

const link = `
	label,
	_type,
	openInNewTab,
	jumpScrollId,
	externalLink,
	internalLink->{
		_type,
		title,
		slug,
		_type == 'product' => {
			"title" : store.title,
			"slug": store.slug
		},
	},
	file{
		_type,
		asset->
	}
`

const internalLink = `
	_type,
	internalLink->{
		_type,
		title,
		slug
	}
`

const normal = `
	...,
	en[]{
		...,
		markDefs[]{
			...,
			_type == 'link' => {
				...,
				${link}
			}
		}
	}
`

const accordion = `
	groups[]{
		...,
		title,
		body{
			...,
			${normal}
		}
	}
`

const seo = `
	seo {
		...,
		"ogImageUrl": socialShareImage.asset->url
	}
`

const productSnippet = `
	...,
	shortDescription {
		...
	},
	store {
		options,
		isDeleted,
		priceRange,
		title,
		slug,
		...,
		variants[]->{
			store,
			"swatch": *[_type == 'productSettings'][0].colours[colour == ^.store.option1][0]{
				"image": image.image{
					_type,
					alt,
					asset->,
					...,
				}
			}.image,
			thumbnail{
				...,
				image {
					_type,
					alt,
					asset->
				}
			},
			media[]{
				...,
				image {
					_type,
					alt,
					asset->
				}
			},
			threeSixty[]{
				...,
				image {
					...,
					_type,
					asset->
				}
			},
		}
	}
`;

const knotsSnippet = `
...,
layerProducts[]-> {
	...,
	${productSnippet}
},
	description {
		...,
		${normal}
	},
	featuredImage {
		...,
		image {
			...,
			_type,
			asset->
		}
	},
	featuredVideo {
		video {
      _type,
      asset->
    },
    shortLoop {
      _type,
      asset->
    },
		mobileVideo {
      _type,
      asset->
    },
    mobileShortLoop {
      _type,
      asset->
    },
    type
	},
	blocks[]{
		...,
		thumbnail {
			...,
			image {
				...,
				_type,
				asset->
			}
		},
		featuredImage {
			...,
			image {
				...,
				_type,
				asset->
			}
		},
		body {
			${normal}
		},
		linkedProducts[]->{
			${productSnippet}
		},
		media {
			...,
			media[]{
				...,
				image {
					...,
					_type,
					asset->
				}
			},
			caption {
				...,
				${normal}
			}
		}
	}
`;

export const knotsQuery = `*[_type == 'knots'][0]{
	${knotsSnippet},
	${seo}
}`;


const addToCalendarLabel = `*[_type == 'settings'][0].addToCalendarLabel`
const getDirectionsLabel = `*[_type == 'settings'][0].getDirectionsLabel`
const emailLabel = `*[_type == 'settings'][0].emailLabel`
const passwordLabel = `*[_type == 'settings'][0].passwordLabel`
const generalEmail = `*[_type == 'contact'][0]{
	email[] {
		${normal}
	}
}.email`

export const contactQuery = `*[_type == 'contact'][0]{
	title,
	"getDirectionsLabel": ${getDirectionsLabel},
	lofts[]{
		...,
		${image},
		telephone[] {
			${normal}
		},
		email[] {
			${normal}
		}
	},
	email[] {
		${normal}
	},
	${seo}
}`

export const homeQuery = `*[_type == 'home']|order(_createdAt desc)[0]{
	...,
	blocks[]{
		...,
		_type == 'newsletterCatcher' => {
			...,
			subtitle {
				${normal}
			}
		},
		_type == 'homeVideo' => {
			...,
			${video},
			link{
				...,
				${internalLink}
			},
			buttons[]{
				...,
				${link}
			}
		},
		_type == 'homeSingleImage' => {
			...,
			${image},
			link{
				...,
				${internalLink}
			},
			buttons[]{
				...,
				${link}
			}
		},
		_type == 'homeImageText' => {
			...,
			${image},
			text {
				...,
				${normal}
			},
			thumbnail {
				...,
				_type,
				asset->
			},
			linkedPages[] {
				...,
				${link}
			}
		},
		_type == 'homeProductGrid' => {
			...,
			products[]-> {
				store {
					title,
					slug,
					isDeleted,
					status,
					variants[store.isDeleted != true]->{
						store {
							title
						},
						media[]{
							...,
							image {
								...,
								_type,
								asset->
							}
						}
					},
				},
			}
		},
		_type == 'homeEvent' => {
			...,
			link{
				...,
				${internalLink}
			},
			video {
				...,
				asset->
			}
		},
		_type == 'homeEditorial' => {
			...,
			${image},
			link{
				...,
				${internalLink}
			},
			buttons[]{
				...,
				${link}
			}
		},
		_type == 'homeDoubleImage' => {
			...,
			linkOne{
				...,
				${internalLink}
			},
			imageOne{
				...
			},
			linkTwo{
				...,
				${internalLink}
			},
			imageTwo{
				...,
				image {
					_type,
					alt,
					asset->
				}
			}
		},
		_type == 'homeRail' => {
			...,
			title {
				...,
				${normal}
			},
			description {
				...,
				${normal}
			},
			Images[]{
				...,
				link->{
					_type,
					title,
					slug,
					_type == 'product' => {
						"title" : store.title,
						"slug": store.slug
					},
				},
				imageBlock{
					...,
					image {
						...,
						_type,
						alt,
						asset->
					}
				}
			},
			link{
				...,
				${link}
			}
		}
	},
	${seo}
}`

export const historyQuery = `*[_type == 'history'][0]{
	...,
	body {
		...,
		${normal}
	},
	timeline[]{
		...,
		media[]{
			...,
			image {
				...,
				_type,
				asset->
			}
		},
		caption {
			...,
			${normal}
		}
	},
	${seo}
}`

const productDetailText = `
	...,
	title {
		...,
		${normal}
	},	
	body {
		...,
		${normal}
	},	
	marginalia[]{
		...,
		body {
			${normal}
		}
	}
`;

export const productQuery = `*[_type == 'product' && store.slug.current == $slug && store.isDeleted != true]|order(_updatedAt desc)[0]{
	...,
	featuredVideo {
		video {
      _type,
      asset->
    },
    shortLoop {
      _type,
      asset->
    },
		mobileVideo {
      _type,
      asset->
    },
    mobileShortLoop {
      _type,
      asset->
    },
    type
	},
	featuredImage {
		...,
		image {
			...,
			_type,
			asset->
		}
	},
	body {
		${productDetailText}
	},
	bodyTwo {
		${productDetailText}
	},
	"addYourInitialsTitle": *[_type == 'productSettings'][0].addYourInitialsTitle{
		..., 
	},
	"addYourInitialsDescription": *[_type == 'productSettings'][0].addYourInitialsDescription{
		..., 
		${normal}
	},
	"separateInitialsLabel": *[_type == 'productSettings'][0].separateInitialsLabel{
		...,
	},
	"customisePopup": *[_type == 'productSettings'][0]{
		customiseVideo{
			...,
			asset->
		},
		customiseVideoDescription{
			...,
			${normal}
		},
		customiseVideoCta
	},
	initialsImage {
		...,
		image {
			...,
			_type,
			asset->
		}
	},
	details {
		...,
		${normal}
	},
	"shipping": *[_type == 'productSettings'][0].shipping{..., ${normal}},
	linkedCustomisations[]->{
		...,
		description{
			...,
			${normal}
		},
		options[]{
			...,
			"linkedPage": linkedPage-> {
				${knotsSnippet}
			},
			products[store.isDeleted != true]-> {
				${productSnippet}
			}
		}
	},
	linkedSizeGuide->{
		...,
		frontImage {
			image {
				...,
				_type,
				asset->
			}
		},
		sideImage {
			image {
				...,
				_type,
				asset->
			}
		}
	},
	store {
		...,
		variants[store.isDeleted != true]->{
			...,
			heroImage {
				...,
				image {
					...,
					_type,
					asset->
				}
			},
			detailImage {
				...,
				image {
						...,
						_type,
						asset->
					}
			},
			media[]{
				...,
				image {
					...,
					_type,
					asset->
				}
			},
			threeSixty[]{
				...,
				image {
					...,
					_type,
					asset->
				}
			},
		},
	},
	"email": *[_type == 'contact'][0].email,
	blocks[]{
		_type,
		_type == 'imageBlock' => {
			...,
			_type,
			asset->
		},
		_type == 'productDetailImageText' => {
			...,
			${image},
			text {
				...,
				${normal}
			},
			thumbnail {
				...,
				_type,
				asset->
			},
			linkedPages[] {
				...,
				${link}
			}
		},
		_type == 'productDetailText' => {
			${productDetailText}
		}
	},
	"relatedPlp": *[_type == 'productListing' && references(^._id)][0].blocks[_type == 'productListingBlock']{
		products[]->{
			"slug": store.slug.current
		}
	},
	${seo}
}`


export const plpQuery = `*[_type == 'productListing' && slug.current == $slug][0]{
	...,
	blocks[]{
		...,
		_type == 'productListingBlock' => {
			...,
			${video},
			description {
				...,
				${normal}
			},
			featuredImage {
				...,
				image {
					...,
					_type,
					asset->
				}
			},
			thumbnail {
				...,
				image {
					...,
					_type,
					asset->
				}
			},
			products[store.isDeleted != true]->{
				${productSnippet}
			}
		}
	},
	${seo}
}`;

// "swatch": *[_type == 'productSettings'][0].colours[colour == ^.store.title]{
// 	"image": image.image{
// 		_type,
// 		alt,
// 		asset->
// 	}
// }[0].image,

export const teamQuery = `*[_type == 'team'][0]{
	title,
	people[]{
		...,
		${image},
		bio{
			...,
			${normal}
		}
	},
	${seo}
}`

export const bagQuery = `*[_type == 'bagSettings'][0]{
	title,
	bagEmptyDescription,
	continueLabel,
	checkoutLabel,
	"variantsWithCustomisations" : *[_type == 'product' && defined(linkedCustomisations)].store.variants[store.isDeleted != true]->store.id
}`

export const menuQuery = `*[_type == 'menu'][0]{
	...,
	menuItems[]{
		_type == 'menuLevelOne' => {
			...,
			${image},
			menuItems[]{
				...,
				links[]{
					...,
					${link}
				}
			}
		},
		_type == 'menuLevelOneFindUs' => {
			...,
			${image},
			"getDirectionsLabel": ${getDirectionsLabel},
			"emailLabel": ${emailLabel},
			"email": ${generalEmail},
			generalEmailLabel,
			"loftArray": *[_type == 'contact'][0]{
				lofts[]{
					title,
					address,
					"emailLink": email[0].markDefs[0].externalLink,
					openingHours[],
					addressLink,
					telephone[] {
						${normal}
					}
				}
			},
			"currentLocation": *[_type == 'events' && endDate >= now()] | order(startDate asc)[0]{
				title,
				startDate,
				endDate,
				addressLink
			}
		},
		_type == 'link' => {
			...,
			${link}
		}
	},
	"email": ${generalEmail},
	"loftArray": *[_type == 'contact'][0]{
		lofts[]{
			title,
			addressLink,
			"emailLink": email[0].markDefs[0].externalLink,
			"telephoneLink": telephone[0].markDefs[0].externalLink,
		}
	},
	findUsImage{
		image {
			...,
			_type,
			asset->
		}
	}
}`

export const eventsQuery = `{
  "events": *[_type == 'events' && endDate >= now()] | order(startDate asc)[0...10] {
    ...,
    ${image},
  },
  "settings": {
    "addToCalendarLabel": ${addToCalendarLabel},
    "getDirectionsLabel": ${getDirectionsLabel}
  },
	"eventsSettings": *[_type == 'eventsSettings'][0]{
			...,
			${seo}
		},
}`

export const pageQuery = `*[_type == 'page' && slug.current == $slug][0]{
	title,
	slug,
	...,
	${image},
	blocks[]{
		...,
		_type == 'pageText' => {
			...,
			body{
				...,
				${normal}
			}
		},
		_type == 'module.accordion' => {
			...,
			${accordion}
		}
	},
	${seo}
}`

export const editorialQuery = `*[_type == 'editorial' && slug.current == $slug][0]{
	title,
	slug,
	sections[]{
		...,
		blocks[]{
			...,
			_type == 'editorialFeaturedImage' => {
				...,
				${image},
				body{
					...,
					${normal}
				}
			},
			_type == 'editorialContents' => {
				...,
				${image},
				link {
					...,
					${link}
				},
				body{
					...,
					${normal}
				},
				blocks[]{
					...,
					title,
					${image},
				}
			},
			_type == 'editorialMedia' => {
				...,
				media[]{
					...,
					image {
						...,
						_type,
						asset->
					}
				},
				caption {
					...,
					${normal}
				}
			},
			_type == 'editorialText' => {
				...,
				body {
					...,
					${normal}
				}
			},
			_type == 'editorialQuote' => {
				...
			},
			_type == 'editorialLofts' => {
				...,
				"loftArray": *[_type == 'contact'][0]{
					...,
					lofts[]{
						title,
						${image},
						telephone[] {
							${normal}
						}
					}
				}
			},
			_type == 'editorialFaq' => {
				...,
				title,
				blocks[]{
					...,
				}
			}
		}
	},
	${seo}
}`

export const formQuery = `*[_type == 'settings'][0]{
	emailPlaceholderLabel,
	fieldRequiredMessage,
	invalidEmailMessage,
	newsletterImage {
		...,
		image {
			...,
			asset->
		}
	},
	subscribeLabel,
	subscribeTerms{
		...,
		${normal}
	}
}`

export const registerInterestQuery = `*[_type == 'registerInterest'][0]{
	...,
	images[]{
		...,
		${image}
	},
	newsletterImage{
		...,
		${image}
	},
	blocks[]{
		...,
		_type == 'registerInterestText' => {
			...,
			title {
				...,
				${normal}
			},
			body {
				...,
				${normal}
			}
		}
	},
	"form": ${formQuery},
	${seo}
}`;

const footerLinkList = `
	...,
	links[]{
		...,
		${link}
	}
`



export const loginQuery = `*[_type == 'login'][0]{
	createAccountLabel{
		...,
		${normal}
	},
	forgotPasswordLabel,
	loginButtonLabel,
	loginLabel,
	loggingInButtonLabel,
	logOutMessage,
	resetPasswordLabel,
	"emailPlaceholderLabel": *[_type == 'settings'][0].emailPlaceholderLabel,
	"passwordPlaceholderLabel": *[_type == 'settings'][0].passwordPlaceholderLabel,
	${seo}
}`;

export const registerQuery = `*[_type == 'register'][0]{
	...,
	termsLabel {
		...,
		${normal}
	},
	alreadyHaveAnAccountLabel {
		...,
		${normal}
	},
	"emailPlaceholderLabel": *[_type == 'settings'][0].emailPlaceholderLabel,
	"passwordPlaceholderLabel": *[_type == 'settings'][0].passwordPlaceholderLabel,
	${seo}
}`;

export const accountQuery = `*[_type == 'accountSettings'][0]{
	...,
	${image},
	orderHelpLink {
		...,
		${link}
	},
	${seo}
}`;

export const xeroQuery = `*[_type == 'xero'][0]{
	...,
	video {
		...,
		asset->
	},
	${seo}
}`;


export const productPersonalisationOverviewQuery = `*[_type == 'productPersonalisationOverview'][0]{
	...,
	blocks[]{
		_type == 'productDetailImageText' => {
			...,
			${image},
			text {
				...,
				${normal}
			},
			thumbnail {
				...,
				_type,
				asset->
			},
			linkedPages[] {
				...,
				${link}
			}
		}
	},
	${seo}
}`;

export const footerQuery = `*[_type == 'footer'][0]{
	"companyName": *[_type == 'settings'][0].companyName,
	columnOne[]{
		${footerLinkList}
	},
	columnTwo[]{
		${footerLinkList}
	},
	columnThree[]{
		${footerLinkList}
	},
	loftsLabel,
	includeLofts,
	"subscribeToNewsletterSubtitle": *[_type == 'settings'][0].subscribeToNewsletterSubtitle{
		${normal}
	},
	"email": ${generalEmail},
	"loftArray": *[_type == 'contact'][0]{
		lofts[]{
			title,
			address,
			openingHours[],
			addressLink,
			telephone[] {
				${normal}
			}
		}
	},
	externalLinks[]{
		${link}
	},
	legalLinks[]{
		${link}
	}
}`

export const editorialOverviewQuery = `*[_type == 'editorialOverview' && slug.current == $slug][0]{
	title,
	slug,
	newsletterCatcher,
	newsletterCatcherPosition,
	pinnedEditorial[]->{
		title,
		slug,
		seo {
			socialShareImage {
				...,
				_type,
				asset->
			}
		}
	},
	blocks[0...${loadingThreshold}]->{
		title,
		slug,
		_type,
		fullWidthOnEditorialOverview,
		seo {
			description,
			socialShareImage {
				...,
				_type,
				asset->
			}
		}
	},
	"count": count(blocks),
	${seo}
}`

export const newslettersQuery = `*[_type == 'newsletter' && live == true]|order(dateTime(date) desc){
	title,
	slug,
	date,
	${image},
	shortDescription
}`

export const newsletterQuery = `*[_type == 'newsletter' && slug.current == $slug][0]{
	title,
	_id,
	_type,
	slug,
	date,
	${image},
	blocks[]{
		...,
		_type == 'newsletterImage' => {
			...,
			${image}
		}
	}
}`

export const recommendationsQuery = `*[_type == "product" && store.slug.current in $slugs && store.isDeleted != true && store.status == 'active'][0]{
	relatedProducts[]->{
		${productSnippet}
	}
}.relatedProducts`

export const recommendationsGeneralQuery = `*[_type == "productSettings"][0]{
	crossSellingProducts[!(store.slug.current in $slugs)]->{
		${productSnippet}
	}
}.crossSellingProducts`;

export const privacySettingsQuery = `*[_type == "privacySettings"][0]{
	...,
	description {
		...,
		${normal}
	},
	privacyTrackingTypes[]{
		...,
		body {
			...,
			${normal}
		}
	},
	excludedGoogleAnalyticsPages[]->{
		"slug": coalesce(slug.current, store.slug.current)
	},
	includedHotjarPages[]->{
		"slug": coalesce(slug.current, store.slug.current)
	},
}`;

export const preCheckoutQuery = `*[_type == 'preCheckout'][0]{
	...,
	featuredImage {
		...,
		image {
			...,
			_type,
			asset->
		}
	},
	crossSellingProducts[]->{
		${productSnippet}
	},
}`;

export const testQuery = `*[_type == "product" && store.slug.current == 'the-ratsey'][0]{
	...,
	store {
		...,
		variants[store.isDeleted != true]->{
			...,
		}
	}
}`

export const lockScreenQuery = `*[_type == 'lockScreen'][0]{
	title,
	video {
		...,
		asset->
	},
	${seo}
}`