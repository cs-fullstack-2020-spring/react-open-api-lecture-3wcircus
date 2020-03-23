import React, { Component } from 'react';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datalist: []
        }
    }

    // Hook into component mount and do initial fetch as soon as component mounted
    componentDidMount() {
        this.loadData();
    }

    // Fetch from web service (use promises and the aynch/await)
    loadData = async () => {
        console.log(`Trying to fetch School data`);

        // Version using fetch and promises
        // fetch('http://universities.hipolabs.com/search?name=southwest')
        //     .then((data) => data.json())
        //     .then((data) => this.setState({ datalist: data }));
        
        // Version using aync/await
        const response = await fetch('http://universities.hipolabs.com/search?name=southwest');
        const json = await response.json();
        this.setState({ datalist: json });
    }

    // Method render this component
    render() {
        // console.log(this.state); // sanity
        // Iterate through each object returned and render it's properties
        // NOTE: Instead of just <p> tags a better approach would be to have an additional School component rendered for each JSON object
        return (
            this.state.datalist.map((school, idx) => {
                return (
                    <div key={idx}>
                        <p>{`Country: ${school.country}`}</p>
                        <p>{`School Name: ${school.name}`}</p>
                        <a target='_blank' rel="noopener noreferrer" href={school.web_pages[0]}>{school.name}</a> 
                        <hr/>
                    </div>
                )
            }
            )
            );
    }
}

export default AppContainer;
