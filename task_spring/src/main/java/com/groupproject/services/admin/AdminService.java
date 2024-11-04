package com.groupproject.services.admin;

import com.groupproject.dtos.CommentDTO;
import com.groupproject.dtos.TaskDTO;
import com.groupproject.dtos.UserDTO;

import java.util.List;

public interface AdminService {

    List<UserDTO> getUsers();

    TaskDTO postTask(TaskDTO taskDTO);

    List<TaskDTO> getTasks();

    TaskDTO getTaskById(Long id);

    void deleteTask(Long id);

    List<TaskDTO> searchTask(String title);

    TaskDTO updateTask(Long id,TaskDTO taskDTO);

    CommentDTO createComment(Long taskId, Long postedBy, String content);

    List<CommentDTO> getCommentsByTask(Long taskId);


}




