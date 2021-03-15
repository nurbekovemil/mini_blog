import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Row,Col,Pagination} from 'react-bootstrap'
import {getAllPosts} from '../redux/actions/homeAction'

import {CardPost} from '../components/post/CardPost'

export const HomePage = () => {
	const dispatch = useDispatch()
	const {posts, limit, page, post_count} = useSelector(state => state.homeReducer)
	let count_pages = []
	for (let i = 1; i <= Math.ceil(post_count/limit); i++) {
		count_pages.push(i)
	}
	const handlePagination = (current_page) => {
		dispatch(getAllPosts({limit: limit, page:current_page}))	
	}
	useEffect(() => {
		handlePagination(page)
	}, [])
	return (
			<Row>
				<Col sm={12} md={8}>
					{
						posts.length ? posts.map((post, i) => (
							<CardPost key={i} post={post} access_tools={false} distype="ALL_POST" p={{limit:limit, page:page}}/>
						)) : 'Loading...'
					}
				</Col>
				<Col sm={12} md={4}>Sidebar</Col>
				<Col sm={12} md={8}>
					<Pagination>
						{
							post_count > limit && count_pages.map(i => (
									<Pagination.Item key={i} active={i===page} onClick={() => handlePagination(i)}>
										{i}
									</Pagination.Item>
							))
						}
					</Pagination>
				</Col>
			</Row>
		)
}
