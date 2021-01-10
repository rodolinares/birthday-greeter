import { Request, Response } from "express";
import { normalizeName } from "normalize-text";

import { User } from "../models/user.model";

export const createUser = (req: Request, res: Response) => {
  try {
    const user = new User();
    user.birth_date = req.body.birth_date;
    user.gender = req.body.gender;
    user.name = normalizeName(req.body.name);
    user.phone = req.body.phone.replace(/ /g, "");
    // user.picture = req.body.picture;

    user
      .save()
      .then(u => {
        res.status(201).send(u);
      })
      .catch(error => {
        console.error(error);
        res.status(400).send({ error, message: "Ocurrió un problema al intentar crear el usuario" });
      });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error, message: "Ocurrió un problema al intentar crear el usuario" });
  }
};

export const retrieveUser = (req: Request, res: Response) => {
  try {
    User.findById(req.params.id)
      .then(user => {
        if (user) {
          res.send(user);
        } else {
          res.status(404).send({ message: "Usuario no encontrado" });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(400).send({ error, message: "Ocurrió un problema al intentar obtener el usuario" });
      });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error, message: "Ocurrió un problema al intentar obtener el usuario" });
  }
};

export const updateUser = (req: Request, res: Response) => {
  try {
    User.findByIdAndUpdate(
      req.params.id,
      {
        birth_date: req.body.birth_date,
        gender: req.body.gender,
        name: normalizeName(req.body.name),
        phone: req.body.phone.replace(/ /g, "")
        // picture: req.body.picture,
      },
      { new: true }
    )
      .then(user => {
        if (user) {
          res.send(user);
        } else {
          res.status(404).send({ message: "Usuario no encontrado" });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(400).send({ error, message: "Ocurrió un problema al intentar modificar el usuario" });
      });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error, message: "Ocurrió un problema al intentar modificar el usuario" });
  }
};

export const removeUser = (req: Request, res: Response) => {
  try {
    User.findByIdAndRemove(req.params.id)
      .then(user => {
        if (user) {
          res.send(user);
        } else {
          res.status(404).send({ message: "Usuario no encontrado" });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(400).send({ error, message: "Ocurrió un problema al intentar eliminar el usuario" });
      });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error, message: "Ocurrió un problema al intentar eliminar el usuario" });
  }
};

export const listUsers = (_: Request, res: Response) => {
  try {
    User.find()
      .then(users => {
        res.send(users);
      })
      .catch(error => {
        console.error(error);
        res.status(400).send({ error, message: "Ocurrió un problema al intentar listar los usuarios" });
      });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error, message: "Ocurrió un problema al intentar listar los usuarios" });
  }
};
