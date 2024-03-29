import { useState, useEffect } from "react";
import type { FC } from "react";

import { Checkbox, Radio, Dropdown, Button, FloatButton } from "antd";
import type { CheckboxProps, MenuProps } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { ShareAltOutlined, DownloadOutlined } from "@ant-design/icons";
import classnames from "classnames";
import { CSSTransition } from "react-transition-group";

import "./PageNode.scss";
import FolderImg from "@/assets/images/page-node/folder.png";
import FileImg from "@/assets/images/page-node/file.png";
import { MoreIcon, FolderIcon } from "@/components/icon/CommonIcon";
import {
  AddIcon,
  UploadFileIcon,
  UploadFolderIcon,
  MoveIcon,
  DeleteIcon,
} from "@/components/icon/NodeIcon";

interface Node {
  id: number;
  type: "file" | "folder";
  name: string;
  createTime: string;
  checked: boolean;
  size?: number;
}

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const PageFile: FC = () => {
  const [nodeList, setNodeList] = useState<Node[]>([]);

  const checkedCount: number = nodeList.filter((item) => item.checked).length;

  const indeterminate: boolean =
    checkedCount > 0 && checkedCount < nodeList.length;

  const onCheckAllChange: CheckboxProps["onChange"] = (
    e: CheckboxChangeEvent,
  ): void => {
    setNodeList((): Node[] => {
      return e.target.checked
        ? nodeList.map((item) => {
            // 如果多选框被选中，则将所有节点的 checked 属性设置为 true
            item.checked = true;
            return item;
          })
        : nodeList.map((item) => {
            // 如果多选框被没有选中，则将所有节点的 checked 属性设置为 false
            item.checked = false;
            return item;
          });
    });
  };

  const checkNode = (node: Node): void => {
    const list = nodeList.slice();
    list.forEach((item) => {
      if (item.id === node.id) {
        item.checked = !node.checked;
      }
    });
    setNodeList(list);
  };

  const nodeOperation: MenuProps["items"] = [
    {
      key: "share",
      label: "分享",
    },
    {
      key: "download",
      label: "下载",
    },
    {
      type: "divider",
    },
    {
      key: "move",
      label: "移动",
    },
    {
      key: "rename",
      label: "重命名",
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: "放入回收站",
      danger: true,
    },
  ];

  const createItems: MenuProps["items"] = [
    {
      key: "uploadFile",
      icon: <UploadFileIcon />,
      label: "上传文件",
    },
    {
      key: "uploadFolder",
      icon: <UploadFolderIcon />,
      label: "上传文件夹",
    },
    {
      type: "divider",
    },
    {
      key: "createFolder",
      icon: <FolderIcon />,
      label: "新建文件夹",
    },
  ];

  useEffect(() => {
    const list: Node[] = [];
    for (let i = 1; i < 6; i++) {
      list.push({
        id: i * 10000,
        type: getRandomInt(1, 10) % 2 === 0 ? "file" : "folder",
        name: "文件" + getRandomInt(1, 10),
        checked: false,
        createTime: "2021-01-01",
        size: getRandomInt(500, 100000),
      });
    }
    setNodeList(list);
  }, []);

  return (
    <div className="page-node">
      <div className="node-handler">
        <div className="node-check">
          <Checkbox
            indeterminate={indeterminate}
            checked={nodeList.length === checkedCount}
            onChange={onCheckAllChange}
          />
          <span className="node-check-text">
            {checkedCount > 0
              ? "已选择" + checkedCount
              : "共" + nodeList.length}
            项
          </span>
        </div>
      </div>
      <div className="node-list">
        <div className="node-list-wrapper">
          {nodeList.map((node) => (
            <div
              className={classnames("node-item", {
                "is-checked": node.checked,
              })}
              title={node.name}
              key={node.id}
            >
              <div className="node-check">
                <Radio checked={node.checked} onClick={() => checkNode(node)} />
              </div>
              <div className="node-operation">
                <Dropdown
                  menu={{ items: nodeOperation }}
                  placement="bottomLeft"
                >
                  <Button type="text" icon={<MoreIcon />}></Button>
                </Dropdown>
              </div>
              <div className="node-content">
                <div className="node-img">
                  <img
                    src={node.type === "folder" ? FolderImg : FileImg}
                    alt={node.name}
                  />
                </div>
                <div className="node-info">
                  <p className="node-name">{node.name}</p>
                  <p className="node-time">{node.createTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Dropdown menu={{ items: createItems }} placement="topRight">
          <FloatButton
            type="primary"
            icon={<AddIcon />}
            className="create-btn"
          />
        </Dropdown>
        <CSSTransition
          in={indeterminate}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <FloatButton.Group shape="square" className="checked-btn-group">
            <FloatButton
              className="checked-btn-item"
              icon={<ShareAltOutlined />}
            />
            <FloatButton
              className="checked-btn-item"
              icon={<DownloadOutlined />}
            />
            <FloatButton className="checked-btn-item" icon={<MoveIcon />} />
            <FloatButton className="checked-btn-item" icon={<DeleteIcon />} />
          </FloatButton.Group>
        </CSSTransition>
      </div>
    </div>
  );
};

export default PageFile;
