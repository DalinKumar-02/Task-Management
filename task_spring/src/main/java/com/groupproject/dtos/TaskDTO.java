package com.groupproject.dtos;

import com.groupproject.enums.TaskStatus;
import lombok.Data;

import java.util.Date;

@Data
public class TaskDTO {

    private Long id;

    private String title;

    private Date dueDate;

    private String description;

    private String priority;

    private TaskStatus taskStatus;

    private Long employeeId;

    private String employeeName;
}
