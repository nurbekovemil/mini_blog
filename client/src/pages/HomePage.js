import React, {useEffect, useState} from 'react'
import { Row, Col, Card, Pagination} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {getAllPosts} from '../redux/actions/homeAction'

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
		dispatch(getAllPosts({limit: limit, page:page}))
	}, [])
	return (
			<Row>
				<Col sm={12} md={8}>
					{
						posts.length ? posts.map((post, i) => (
							<Card key={i}>
								<Card.Body>
									<Card.Title>{post.title}</Card.Title>
									<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
									<Card.Text>
										{post.description}
									</Card.Text>
								</Card.Body>
							</Card>
						)) : 'Loading...'
					}
				</Col>
				<Col sm={12} md={4}>Sidebar</Col>
				<Col sm={12} md={8}>
					<Pagination>
						{
							count_pages.map(i => (
									<Pagination.Item key={i} active={ i === page} onClick={() => handlePagination(i)}>
										{i}
									</Pagination.Item>
							))
						}
					</Pagination>
				</Col>
			</Row>
		)
}
