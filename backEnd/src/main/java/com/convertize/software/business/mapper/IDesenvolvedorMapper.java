package com.convertize.software.business.mapper;

import com.convertize.software.controller.dto.in.DesenvolvedoresRecord;
import com.convertize.software.controller.dto.out.DesenvolvedoresRecordOut;
import com.convertize.software.core.entities.Desenvolvedor;
import org.mapstruct.Mapper;
import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
@org.springframework.stereotype.Component("desenvolvedorMapper")
public interface IDesenvolvedorMapper {

    Desenvolvedor paraEntity(DesenvolvedoresRecord desenvolvedor);

    DesenvolvedoresRecordOut paraout(Desenvolvedor desenvolvedor);

    Desenvolvedor paraEntityCancelamento(Desenvolvedor desenvolvedor);
}
