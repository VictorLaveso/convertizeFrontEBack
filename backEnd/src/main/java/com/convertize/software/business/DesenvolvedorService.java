package com.convertize.software.business;

import com.convertize.software.core.repositories.DesenvolvedorRepository;
import com.convertize.software.business.mapper.IDesenvolvedorMapper;
import com.convertize.software.controller.dto.in.DesenvolvedoresRecord;
import com.convertize.software.controller.dto.out.DesenvolvedoresRecordOut;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class DesenvolvedorService {

    private final DesenvolvedorRepository repository;
    private final IDesenvolvedorMapper desenvolvedorMapper;
    
    public DesenvolvedoresRecordOut gravarDesenvolvedor(DesenvolvedoresRecord desenvolvedor) {
        return desenvolvedorMapper.paraout(
                repository.save(
                        desenvolvedorMapper.paraEntity(desenvolvedor)));
    }

    public List<DesenvolvedoresRecordOut> getTodosDesenvolvedores() {
        return repository.findAll()
            .stream()
            .map(dev -> new DesenvolvedoresRecordOut(
                    dev.getId(),
                    dev.getLogin(),
                    dev.getValorUsuario()
            ))
            .toList();
    }

    public void cancelar(long id) {
        repository.deleteById(id);
    }
}