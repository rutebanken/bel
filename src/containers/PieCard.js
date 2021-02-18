/*
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
 * the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *   https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and
 * limitations under the Licence.
 *
 */

import PropTypes from 'prop-types';

import React from 'react';
import { Pie as PieChart } from 'react-chartjs-2';
import { Card, CardText } from 'material-ui/Card';
import { color } from 'bogu/styles';

import { segmentName, segmentColor } from 'bogu/utils';

class PieCard extends React.Component {
  static propTypes = {
    stats: PropTypes.object.isRequired,
    handlePieOnClick: PropTypes.func.isRequired,
    handleshowAllClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      size: 200
    };
  }

  updateDimensions = () => {
    this.setState({ size: Math.round(window.innerHeight / 4) });
  };

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const showAllStyle = {
      color: 'rgb(17, 105, 167)',
      fontWeight: 600,
      textDecoration: 'underline',
      cursor: 'pointer',
      marginTop: 10,
      textAlign: 'center'
    };

    const pieStyle = {
      width: this.state.size,
      height: this.state.size,
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
      cursor: 'pointer'
    };

    const pieOptionsFull = {
      animation: false,
      showTooltips: true,
      responsive: true,
      tooltipTemplate: '<%= label %> - <%= value %>'
    };

    const { stats } = this.props;

    const valid = stats.valid.lineNumbers.length;
    const invalid = stats.invalid.lineNumbers.length;
    const expiring = stats.expiring.lineNumbers.length;
    const dynamic = [];

    const pieData = {
      labels: [
        segmentName('valid', 0, 'nb'),
        segmentName('expiring', 0, 'nb')
      ],
      datasets: [{
        data: [
          valid,
          expiring
        ],
        backgroundColor: [
          color.highlight.valid,
          color.highlight.expiring
        ],
        hoverBackgroundColor: [
          color.valid,
          color.expiring
        ]
      }]
    }

    for (let i in dynamic) {
      const category = dynamic[i];
      const numDays = category.numDaysAtLeastValid;
      const length = category.lineNumbers.length;

      pieData.labels.push(segmentName('dynamic', numDays, 'nb'));
      pieData.datasets[0].data.push(length);
      pieData.datasets[0].backgroundColor.push(segmentColor(numDays));
      pieData.datasets[0].hoverBackgroundColor.push(segmentColor(numDays, 20));
    }

    pieData.labels.push(segmentName('invalid', 0, 'nb'));
    pieData.datasets[0].data.push(invalid);
    pieData.datasets[0].backgroundColor.push(color.highlight.invalid);
    pieData.datasets[0].hoverBackgroundColor.push(color.invalid);


    return (
      <Card style={{ margin: '0.5vh 0.7vw' }}>
        <CardText>
          <PieChart
            getElementAtEvent={([element]) => {
              this.props.handlePieOnClick(element)
            }}
            data={pieData}
            style={pieStyle}
            options={pieOptionsFull}
            width={this.state.size}
            height={this.state.size}
          />
          <div
            onClick={() => this.props.handleshowAllClick()}
            style={showAllStyle}
          >
            Vis alle
          </div>
        </CardText>
      </Card>
    );
  }
}

export default PieCard;
