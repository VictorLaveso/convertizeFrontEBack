import React, { useEffect, useState } from 'react';
import { Table, Input, InputNumber, Button, Row, Col, Avatar, Divider, Checkbox, Upload } from 'antd';
import { UserOutlined, PlusCircleOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

function App() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
  const [inputs, setInputs] = useState([{ usernameCampo: "", precoCampo: "", fotoCampo: "" }])
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tamanhoDaPagina, setTamanhoPaginaAtual] = useState(10)
  const [checked, setChecked] = useState(false);
  const [list, setList] = useState([]);

  const columns = [
    {
      title: 'Foto',
      dataIndex: 'fotoCampo',
      key: 'fotoCampo',
      render: (fotoCampo) =>
      fotoCampo ? (
        <Avatar shape="square" size="large" src={fotoCampo} />
      ) : (
        <Avatar shape="square" size="large" icon={<UserOutlined />} />
      ),
    },
    {
      title: 'Username',
      dataIndex: 'login',
      key: 'login',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Preço',
      dataIndex: 'valorUsuario',
      key: 'valorUsuario',
      render: text => <a>R$ {text}</a>,
    },

    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => deletarDesenvolvedor(record)} style={{ backgroundColor: "#c9302c", borderColor: "#d43f3a", color: "#fff" }}>Delete</Button>
      ),
    },
  ];

  const onChangeCheckBox = e => {
    setChecked(e.target.checked);
  };


  const adicionar = () => {
    setInputs([...inputs, { usernameCampo: "", precocampo: "", fotoCampo: "" }])
  }

  const formatter = value => {
    const [start, end] = `${value}`.split('.') || [];
    const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `$ ${end ? `${v}.${end}` : `${v}`}`;
  };

  const alterarCampos = (index, field, value) => {
    setInputs(prev => {
      const copia = [...prev];
      copia[index][field] = value;
      return copia;
    });
  }

async function adicionarAoCarrinho() {
    try {
      if (checked) {
        const resultados = await Promise.all(
          inputs.map(async (item) => {
            let valorUsuario = 0;

            const response = await fetch(`https://api.github.com/users/${item.usernameCampo}`)

            if (response.status != 200) {
              return (alert(`erro na consulta do github ${response.status}`))
            }

            const dados = await response.json();
            
            valorUsuario = dados.followers * 10 + (dados.email != null ? +10 : +0) + dados.public_gists * 10 + dados.public_repos * 10;
            dados.valorUsuario = valorUsuario;
            dados.fotoCampo = dados.avatar_url;
            const desenvolvedor = await criarDesenvolvedor(item.usernameCampo, valorUsuario, dados.avatar_url);
            dados.key = desenvolvedor.id;
            return dados;
          }))
            setList(prev => [...prev, ...resultados]);
            return resultados;
      } else {
        const  resultados = await Promise.all(
          inputs.map(async (item) => {
            const dados = await criarDesenvolvedor(item.usernameCampo, item.precoCampo, null);
            dados.key = dados.id;
            dados.id = dados.id;
            dados.login = dados.login;
            dados.valorUsuario = dados.valorUsuario;
            
            return dados;
          }))
            setList(prev => [...prev, ...resultados]);
            return resultados;
      }
    } catch (erro) {
      return (`Erro na consulta`, erro.message);
    }
  }

async function criarDesenvolvedor(login, valorUsuario, fotoCampo) {
  const body = {
    login: login,
    valorUsuario: valorUsuario,
    fotoCampo: fotoCampo
  };
  try {
    const response = await fetch(`${API_URL}/desenvolvedores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log("Criado:", data);
    return data;
  } catch (error) {
    console.log("Não foi possivel adicionar o login ao backend:", error);
    return body;
  }
}

async function buscarDesenvolvedores() {
    try {
        const response = await fetch(`${API_URL}/desenvolvedores`, {
            method: "GET"
        });

        const listaDesenvolvedoresBack = await response.json();
        return listaDesenvolvedoresBack;
    } catch (error) {
        console.error("Nenhum desenvolvedor encontrado:", error);
        return [];
    }
}

async function deletarDesenvolvedor(record) {
    setList(prev => prev.filter(item => item.id !== record.id));
    try {
        await fetch(`${API_URL}/desenvolvedores/${record.id}`, {
          method: "DELETE"
        });
    } catch (error) {
        console.error("Nao foi possivel deletar desenvolvedor", error);
        return [];
    }
}

async function fetchData() {
    const desenvolvedores = await buscarDesenvolvedores();
    if (desenvolvedores && desenvolvedores.length > 0) {
        console.log("Desenvolvedores buscados:", desenvolvedores);
        desenvolvedores.forEach(dev => {
            dev.key = dev.id;
        });
        setList(desenvolvedores);
    } else {
        setList([]);
    }
}

async function finalizarCompra() {
    alert("Pedido confirmado com sucesso!");
    setList([]);
    try {
        for (const item of list) {
            await deletarDesenvolvedor(item);
        }

        setList([]);

    } catch (error) {
        console.error("Erro ao finalizar compra:", error);
    }
}

useEffect(() => {
    fetchData();
}, []);

return (
  <>

    <div style={{ padding: 24 }}>
      <h1>Adicionar desenvolvedor</h1>

      <Row gutter={10}>
        <Col>
          <Button type="primary" style={{ backgroundColor: "#5cb85c", borderColor: "4cae4c", color: "#fff" }}
          onClick={adicionarAoCarrinho}>Adicionar ao carrinho</Button>
        </Col>
        <Col>
          <Button type="primary" onClick={adicionar}><PlusCircleOutlined /></Button>
        </Col>
        <Col>
          <Checkbox onChange={onChangeCheckBox}>Usar dados GitHub</Checkbox>
        </Col>
      </Row>
      <Divider></Divider>
      {inputs.map((item, i) => (
        <React.Fragment key={i}>
          <Row gutter={[10, 10]}>
            <Col>
              <Avatar shape="square" size="large" icon={<UserOutlined />} value={item.fotoCampo} />
            </Col>
            <Col>
              <Input placeholder="username" onChange={(e) => alterarCampos(i, "usernameCampo", e.target.value)}></Input>
            </Col>
            {!checked ?
              <Col>
                <InputNumber
                  formatter={formatter}
                  value={item.price}
                  parser={value => value?.replace(/\$\s?|(,*)/g, '')}
                  onChange={(e) => alterarCampos(i, "precoCampo", e)}
                />
              </Col>
              : ""
            }
          </Row>
          <br></br>
        </React.Fragment>
      ))}
      <Divider></Divider>
      <br></br>
      <h1>Carrinho</h1>
      <Table 
      columns={columns}
      dataSource={list}
      pagination={{current: paginaAtual, pageSize: tamanhoDaPagina, total: list.length, onChange: (paginaAtual, tamanhoDaPagina) =>  {
        setPaginaAtual(paginaAtual);
        setTamanhoPaginaAtual(tamanhoDaPagina);
      }}}
      footer={() => {
        let valorTotal = 0;
        list.forEach(item => {
          valorTotal += item.valorUsuario;
        });
        return (
          <strong>Valor Total: R${valorTotal}</strong>
        );
      }}></Table>
      <br></br>
      <Row justify="end">
        <Button onClick={() => finalizarCompra()}
        type="primary" style={{ backgroundColor: "#4c994cff", borderColor: "4cae4c", color: "#fff" }}>Comprar</Button>
      </Row>
    </div>
  </>
);
}

export default App;