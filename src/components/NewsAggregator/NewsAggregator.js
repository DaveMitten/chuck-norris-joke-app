import React, { Component } from 'react';
import { Button, Layout, Table, Select, Card, Row, Col } from 'antd';

const { Option } = Select;
const url = 'https://api.chucknorris.io/jokes/categories';
class NewsAggregator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			chosenCategory: [],
			joke: [],
		};
	}

	componentDidMount() {
		fetch(url, {
			method: 'GET'
		})
			// eslint-disable-next-line no-console
			.then(response => response.json())
			.then(data => {
				console.log(data);
				this.setState({ categories: data });
			})
			.catch(error => console.log('error:', error));
	}

	onchangeCall = chosenCategory => {
		console.log(chosenCategory);
		this.setState({ chosenCategory });
		fetch(
			`https://api.chucknorris.io/jokes/random?category=${chosenCategory}`,
			{
				method: 'GET'
			}
		)
			.then(response => response.json())
			.then(joke => {
				console.log(joke);
				this.setState({ joke: joke.value });
			})
			.catch(error => console.log('error:', error));
	};


	capitalizeFirstLetter = string =>
		string.charAt(0).toUpperCase() + string.slice(1);

	render() {
		const { Header, Footer, Content } = Layout;
		console.log(this.state);
		return (
			<div style={{ textAlign: 'center', backgroundColor: '#C2DFFF' }}>
					<div style={{ minHeight: '100vh' }}>
						<Row type="flex" justify="center">
							<Col>
									<Select
										style={{ width: 200, marginBottom: 50, marginTop: 50 }}
										placeholder="Select a person"
										optionFilterProp="children"
										onChange={this.onchangeCall}
										filterOption={(input, option) =>
											option.props.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}>
										{this.state.categories.map(cat => (
											<Option value={cat}>
												{this.capitalizeFirstLetter(cat)}
											</Option>
										))}
									</Select>
									<Card
										title={
											this.state.chosenCategory.length > 1
												? this.capitalizeFirstLetter(this.state.chosenCategory) : 'Please select a category'}
										bordered={false}
										style={{ width: 400, minHeight: 200, overflow: 'scroll', padding: 20, borderRadius: '10px' }}>
										<p style={{textAlign: 'left' }}>{this.state.joke.length > 1 ? this.state.joke : 'Joke is coming soon...'}</p>
									</Card>
							</Col>
						</Row>
					</div>
			</div>
		);
	}
}

export default NewsAggregator;
