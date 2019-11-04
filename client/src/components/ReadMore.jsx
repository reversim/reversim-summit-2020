import React from 'react';
import TextTruncate from 'react-text-truncate';

class ReadMore extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      expanded: false,
      onToggle:this.props.onToggle
    };

    this.toggleLines = this.toggleLines.bind(this);
  }

  toggleLines(event) {
    event.preventDefault();
    this.state.onToggle();

    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const { children, more, less, lines } = this.props;
    const { expanded } = this.state;

    return (
      <div>
        <TextTruncate
          line={!expanded && lines}
          text={children}
          textTruncateChild={
            <div>
              <a href="#" onClick={this.toggleLines}>
                {more}
              </a>
            </div>
          }
        >
          {children}
        </TextTruncate>
        { expanded && (
          <span>
              {" "}
            <a href="#" onClick={this.toggleLines}>
                {less}
              </a>
            </span>
        )}
      </div>
    );
  }
}

ReadMore.defaultProps = {
  lines: 5,
  more: "Read more",
  less: "Show less"
};

export default ReadMore;
