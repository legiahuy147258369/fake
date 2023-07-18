import React from 'react'
import { PiArrowBendDownRightBold, PiArrowBendLeftUpBold } from 'react-icons/pi';
import { Collapse, theme, Avatar, List } from 'antd';
import { formatNgay, formatTimeAgo } from '../../utils/format';

const getItems = (panelStyle, reply) => [
    {
        key: '1',
        label: <p className='text_title_comment'> Có {reply.length} phản hồi bình luận trên</p>,
        children:
            <List
                itemLayout="horizontal"
                dataSource={reply}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<p className='fw-5 fs-1'> {item.name}  <span className='text-grey'>{formatTimeAgo(item.created_at)}</span></p>}
                            description={item.content}
                        />
                    </List.Item>
                )}
            />,
        style: panelStyle,
    }
];

const ShowReply = (props) => {
    const { reply } = props;
    const panelStyle = {
        marginBottom: 10,
        background: 'white',
        border: 'none',
    };
    return (
        <Collapse
            className='collapse__reply'
            bordered={false}
            expandIcon={({ isActive }) => isActive ? <PiArrowBendLeftUpBold /> : <PiArrowBendDownRightBold />}
            items={getItems(panelStyle, reply)}
        />
    );
}

export default ShowReply